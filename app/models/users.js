var mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = mongoose.model('users', {
	username: {type: String, default: ''},
	password: {type: String, default:''},
	confirmed: {type: Boolean, default:false}
});