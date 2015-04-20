var mongoose = require('mongoose');
var User = mongoose.model('User');
var Exercise = mongoose.model('Exercise');

/**
 * GET - Return all users in the DB
 */

exports.findAllUsers = function(req, res){
     User.find(function(err, users){
          if(err)res.send(500, err.message);

          console.log('GET/Users')
          res.status(200).jsonp(users);
     });
};

/**
 * POST - Insert a new User in the DB
 */

exports.addUser = function(req,res){
     console.log('POST');
     console.log(req.body);

     // create new user
     var user = new User({
          name: req.body.name,
          surName: req.body.surName,
          birthday: req.body.birthday,
          userName: req.body.userName,
          password: req.body.password,
          weight: req.body.weight,
          hight: req.body.hight,
     });

     // read exercises array and create new exercise
     var exercisesArray = req.body.exercises;
     exercisesArray.forEach(function(obj){
          
          // create exercises
          var exercise = new Exercise({
               name: obj.name,
               pr: obj.pr,
               prDate: obj.prDate,
               lastAttempt: obj.lastAttempt,
               lastAttemptDate: obj.lastAttemptDate
          });

          // for add subdocument we need to use push
          user.exercises.push(exercise);
     });

     // save user model with the exercises
     user.save(function(err,user){
          if(err)return res.send(500, err.message);
          res.status(200).jsonp(user);
     });
};
