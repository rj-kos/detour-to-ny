var mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = mongoose.model('blogposts', {
	title : {type : String, default:''},
	content: {type: String, default: ''},
	placeid: {type: String, default: ''},
	featureImage: {type: String, default:''},
	date: {type: Date, default: Date.now}
});