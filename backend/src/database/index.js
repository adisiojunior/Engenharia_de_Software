const mongoose = require("mongoose");
require("dotenv/config");

const config =
  process.env.NODE_ENV === "test"
    ? process.env.DB_URL_TEST
    : process.env.DB_URL;

mongoose.connect(config, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
