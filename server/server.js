const
	// Configuration
	config = require('./config.json'),
	session = require("express-session"),
	// Database
	redis = require('redis'),
	RedisStore = require("connect-redis")(session),
	redisClient = redis.createClient(6379, config.redisHost),
	// Libraries
	express = require("express"),
	cors = require('cors'),
	axios = require('axios'),
	// Server
	app = express(),
	server = require('http').Server(app),
	SocketIO = require("socket.io")(server);
	
/*
 * Create a user session
*/

const sessionMiddleware = session({
    store: new RedisStore({client: redisClient}),
    secret: config.redisSecret,
});

/*
 * Setup Socket.io
*/
SocketIO.use((socket, next) => { sessionMiddleware(socket.request, socket.request.res || {}, next); });
SocketIO.sockets.on("connection", socket => {
    if (socket.request.session.github_user) {
        socket.emit('user_data', {
			access_token: socket.request.session.access_token,
			user: socket.request.session.github_user
		});
    }
});

/*
 * Setup Express
*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }));// Accept requests from our client
app.use(cors({ origin: config.clientOrigin }));
app.use(sessionMiddleware);

/*
 * Routes
*/
app.get(`/`, (req, res) => { res.send(req.session); });
app.get(`/login`, (req, res) => { res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=repo%20user`); });
app.get(`/signout`, (req, res) => {
  req.session.github_user = {};
  req.session.access_token = "";
  res.redirect(config.clientOrigin);
  res.end();
});

app.get(`/callback`, (req, res) => {
    const requestToken = req.query.code;
    axios({
    	method: 'post',
		url: `https://github.com/login/oauth/access_token?client_id=${config.clientId}&client_secret=${config.clientSecret}&code=${requestToken}`,
		headers: { accept: 'application/json' } // Set the content type header, so that we get the response in JSON
	}).then(response => {
		const accessToken = response.data.access_token;
		axios({
			method: 'get',
			url: 'https://api.github.com/user',
			headers: { // Set the content type header, so that we get the response in JSON
				 accept: 'application/json',
				 Authorization: `Bearer ${accessToken}`
			}
		}).then(user_res => {
			req.session.access_token = accessToken;
			req.session.github_user = user_res.data;
			res.redirect(config.clientOrigin);
		}).catch(error => res.json({error}));
	}) .catch(error => res.json({error}));
});

/*
 * Start the server
*/
server.listen(config.port, () => console.log(`[docs-server] running on port ${config.port}`));
