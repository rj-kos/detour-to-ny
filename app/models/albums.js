var mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = mongoose.model('albums', {
	placeid: {type: String, default: ''},
	imagepaths: {type: Array, default:[]},
	date: {type: Date, default: Date.now}
});