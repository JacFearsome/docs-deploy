// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const GITHUB_TOKENS = {
  GITHUB_CLIENT_ID: "",
  GITHUB_CLIENT_SECRET: "",
};

const DB_USER = "";
const DB_PASSWORD = "";
const MONGODB = {
  MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@host/dbname`
};

const SESSION = {
  COOKIE_KEY: ""
};

const KEYS = {
  ...GITHUB_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
