var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Exercise Model
 */

var exerciseModel = new Schema({
    name: String,
    pr: Number,
    prDate: Date,
    lastAttempt: Number,
    lastAttemptDate: Date
});

/**
 * User Model
 */

 var userModel = new Schema({
    name: String,
    surName: String,
    birthday: Date,
    userName: String,
    password: String,
    weight: Number,
    hight: Number,
    exercises: [exerciseModel]
    ///exercises: [{ type: Schema.ObjectId, ref: 'exercise' }]
});


module.exports = mongoose.model('User', userModel);
module.exports = mongoose.model('Exercise', exerciseModel);