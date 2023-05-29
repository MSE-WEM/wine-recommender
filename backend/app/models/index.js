const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.wines = require("./wine.model.js")(mongoose);
db.recipes = require("./recipe.model.js")(mongoose);

module.exports = db;
