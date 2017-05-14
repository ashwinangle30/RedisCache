var mongoose = require('mongoose');
var mongourl = 'mongodb://cmpe280:cmpe280#@ds137281.mlab.com:37281/cmpe_280';
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var imgSchema = new mongoose.Schema({
	img_id: {type: Number, unique: true},
	img: { 
		dataUri: String 
	}
});

imgSchema.plugin(autoIncrement.plugin, {model: 'images', field: 'img_id'});

var image = mongoose.model('images', imgSchema);

module.exports = image;