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
 * GET - Return all exercies for specific user
 */

exports.findExercisesByUserId = function(req, res){
     User.findById(req.params.id, function(err, user){
          if(err) return res.send(500, err.message);

          console.log('GET/Users/' + req.params.id + 'Exercises');
          res.status(200).jsonp(user.exercises);
     });
};

/**
 * GET - Return a User with specified ID
 */

exports.findById = function(req, res) {
     User.findById(req.params.id, function(err, user) {
          if(err) return res.send(500, err.message);

          console.log('GET /users/' + req.params.id);
          res.status(200).jsonp(user);
    });
};

/**
 * GET - Find a specific exercise using ExerciseId and UserId
 */

 exports.findExerciseById = function(req, res) {
     User.findById(req.params.idUser, function(err, user){
          if (err) return res.send(500, err.message);

          // send specific exercise
          var exercise = user.exercises.id(req.params.idExercise);
          res.status(200).json(exercise);
     });
 };

/**
 * PUT - Update user already exists
 */

 exports.updateUser = function(req, res) {
     User.findById(req.params.id, function(err, user){
          user.name     = req.body.name;
          user.surName  = req.body.surName;
          user.birthday = req.body.birthday;
          user.userName = req.body.userName;
          user.password = req.body.password;
          user.weight   = req.body.weight;
          user.hight    = req.body.hight;

          user.save(function(err){
               if(err) return res.send(500, err.message);
               res.status(200).jsonp(user);
          });
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
          hight: req.body.hight
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

/**
 * POST - Insert exercise for specific user
 */

exports.addExercise = function (req, res){
     User.findById(req.params.id, function(err, user){
          
          // create new exercise
          var exercise = new Exercise({
               name: req.body.name,
               pr: req.body.pr
          });

          // add exercise into user
          user.exercises.push(exercise);

          // save user saving the new execersie
          user.save(function(err, user){
               if (err)return res.send(500, err.message);
               res.status(200).jsonp(user);
          });
     });
};

/**
 * DELETE - Delete specific Exercise
 */

 exports.deleteExercise = function (req, res){
     User.findById(req.params.idUser, function(err, user){
          if (err) return res.send(500, err.message);


          var exercise = user.exercises.id(req.params.idExercise);
          user.update({ user._id : req.params.idUser }, { $pull : { exercises : exercise }}, function (err,numAffected,raw) {
                if(err)
                {
                    console.log(err);
                    res.send(500, err.message);
                }
                else
                {
                    console.log(raw);
                    res.status(200);
                }
            });
          // delete specific exercise
          //var exercise = user.exercises.id(req.params.idExercise).remove();

          //user.exercises.pull(req.params.idExercise);
          //console.log(exercise);


          /*collection.update(
            { _id: id },
            { $pull: { 'contact.phone': { number: '+1786543589455' } } }
          );*/

          //user.save();
          //res.status(200);

          /*user.save(function (err) {
               if (err) return handleError(err);
               console.log('Exercise has been removed');
               res.status(200);
          });*/
     });
 };

/**
 * DELETE - Delete specific user
 */

exports.deleteUser = function (req, res){
     User.findById(req.params.id, function(err, user){
          user.remove(function(err){
               if (err) return res.send(500, err.message);
               res.status(200);
          });
     });
};
