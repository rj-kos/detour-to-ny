var mongoose = require('mongoose');

module.exports = mongoose.model('posts', {
	title : {type : String, default:''},
	content: {type: String, default: ''},
	date: {type: Date, default: Date.now}
});