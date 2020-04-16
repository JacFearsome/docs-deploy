// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const GITHUB_TOKENS = {
    GITHUB_CLIENT_ID: "a97315beae250404945d",
    GITHUB_CLIENT_SECRET: "010ef9f79914e723fa3f903cff1360b0d08659db",
  };
  
  const DB_USER = "docdeploy";
  const DB_PASSWORD = "Dy8CdmP3LgnwDYrz";
  const MONGODB = {
    MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds125555.mlab.com:25555/doc-deploy`
  };
  
  const SESSION = {
    COOKIE_KEY: "Dy8CdmP3LgnwDYrz"
  };
  
  const KEYS = {
    ...GITHUB_TOKENS,
    ...MONGODB,
    ...SESSION
  };
  
  module.exports = KEYS;
  