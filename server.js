var express        = require('express'), 
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose');

/**
 * Connection to DB
 */

mongoose.connect('mongodb://localhost/wodapp', function(err, res){
    if(err) throw err;
    console.log('Connected to Mongo DB');
});

/**
 * Middlewares
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

/**
 * Import models and controllers
 */

var models = require('./models/models')(app, mongoose);
var userCtrl = require('./controllers/users');

/**
 * Example Route
 */

var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hellow Word!");
});
app.use(router);

/**
 * API routes
 */

var users = express.Router();
users.route('/users')
	.get(userCtrl.findAllUsers)
   	.post(userCtrl.addUser);

users.route('/users/:id')
    .get(userCtrl.findById)
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);

users.route('/users/:id/exercises')
    .get(userCtrl.findExercisesByUserId);

app.use('/wodapp',users);

/**
 * Listener
 */

app.listen(3000, function(){
    console.log('Node Server running on port 3000');
});
