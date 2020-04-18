const providers = ['github']

const callbacks = providers.map(provider => {
  return `http://localhost:8080/${provider}/callback`
})

const [githubURL] = callbacks

exports.SESSION_SECRET = "102837092183Dy8CdmP3LgnwDYrz09182093id90a9is09da0a9s8d0a"

exports.CLIENT_ORIGIN = 'http://localhost:3000'

exports.GITHUB_CONFIG = {
  //clientID: process.env.GITHUB_KEY,
  //clientSecret: process.env.GITHUB_SECRET,
  clientID: "a97315beae250404945d",
  clientSecret: "010ef9f79914e723fa3f903cff1360b0d08659db",
  callbackURL: githubURL
}

const DB_USER = "docdeploy";
const DB_PASSWORD = "Dy8CdmP3LgnwDYrz";
exports.MONGODB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@ds125555.mlab.com:25555/doc-deploy`