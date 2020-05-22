const express = require("express");
const axios = require('axios')
const cors = require('cors')
const randomString = require('randomstring');
const Server = require("http").Server;
const session = require("express-session");
const redis = require('redis')
const RedisStore = require("connect-redis")(session);
const config = require('./config.json');

const app = express();
const server = Server(app);
const sio = require("socket.io")(server);
const redisClient = redis.createClient(6379, config.redisHost)
let sessionMiddleware = session({
    store: new RedisStore({client: redisClient}),
    secret: config.redisSecret,
});

sio.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));// Accept requests from our client
app.use(cors({
  origin: config.clientOrigin
}))
app.use(sessionMiddleware);

app.get(`/`, (req, res) => {
    res.send(req.session);
});

app.get(`/login`, (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=repo%20user`)
});

app.get(`/signout`, (req, res) => {
  req.session.github_user = {};
  req.session.access_token = "";
  res.redirect(config.clientOrigin)
  res.end()
});

sio.sockets.on("connection", function(socket) {
    if (socket.request.session.github_user) {
        socket.emit('user_data', {access_token: socket.request.session.access_token, user: socket.request.session.github_user})
    }
});

app.get(`/callback`, (req, res) => {
    const requestToken = req.query.code;
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${config.clientId}&client_secret=${config.clientSecret}&code=${requestToken}`,
      // Set the content type header, so that we get the response in JSON
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
      const accessToken = response.data.access_token
      axios({
        method: 'get',
        url: `https://api.github.com/user`,
        // Set the content type header, so that we get the response in JSON
        headers: {
             accept: 'application/json',
             Authorization: `Bearer ${accessToken}`
        }
      }).then(function (user_res) {
            req.session.access_token = accessToken;
            req.session.github_user = user_res.data;
            res.redirect(config.clientOrigin);
      })
      .catch(function (error) {
        res.json({error: error})
      });
    })
    .catch(function (error) {
      res.json({error: error})
    })
});


server.listen(config.port, () => console.log(`[docs-server] running on port ${config.port}`));