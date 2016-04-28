var mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = mongoose.model('statistics', {
	statname : {type : String, default:''},
	number: {type:Number},
	date: {type: Date, default: Date.now}
});