var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// =============================================================================================================================================

// build schema for our database

var MovieSchema = new Schema({
	name: String
});

module.exports = mongoose.model("Movie", MovieSchema);