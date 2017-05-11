var mongoose = require('mongoose');
var mongourl = 'mongodb://cmpe280:cmpe280#@ds137281.mlab.com:37281/cmpe_280';
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var userSchema = new mongoose.Schema({
	user_firstname: {type: String},
	user_lastname: {type: String}
});

userSchema.plugin(autoIncrement.plugin, {model: 'users', field: 'user_id'});

var user = mongoose.model('users', userSchema);

module.exports = user;