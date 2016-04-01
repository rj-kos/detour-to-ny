var mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = mongoose.model('places', {
	placename : {type : String, default:''},
	coordinates: {x:Number, y:Number},
	date: {type: Date, default: Date.now}
});