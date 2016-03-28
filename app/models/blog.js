var mongoose = require('mongoose');

module.exports = mongoose.model('posts', {
	title : {type : String, default:''}
});