

// server.js


// BASE SETUP 
// =============================================================================================================================================

// call needed packages

var express = require("express");
var bodyParser = require("body-parser");
var chalk = require("chalk");
var mongoose = require("mongoose");
const path = require('path');
var Movie = require("./app/models/movies") 	// movie schema
var dotenv = require("dotenv").config();

var app = express();

// configure app to use bodyParser()
// allows us to access data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;		// set port
var db = process.env.DB_CONN;				// connection string (comes from environment variable)
// connect to our database, returns 1 if connection is succesful

mongoose.connect(db, function (err) {
	if (err) {
		console.log(chalk.red("Error connecting to database: " + err))
	} else {
		console.log(chalk.green("========== Connection state to database: " + mongoose.connection.readyState + "=========="));
	}
}) 				


// ROUTES FOR OUR API
// =============================================================================================================================================

var router = express.Router();				// get an instance of express Router

// middleware to use for all requests

router.use(function(req, res, next) {
	console.log("A request is being sent.");
	next();									// go to next request
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get("/", function(req, res) {
	res.json({message: "Welcome to our api!"});
});

router.route("/movies")

// create a movie (accessed at POST http://localhost:8080/api/movies)

.post(function(req, res) {

	var movie = new Movie();					// create new instance of the movie model
	movie.name = req.body.name;					// set movie name (comes from the request)
	
	// save movie and check for errors
	movie.save(function(err) {
		if (err) 
			res.send(err);
		res.json({ message: "Movie created!" });
	});

})
// get all movies
.get(function(req, res) {
	Movie.find(function(err, movies) {
		if(err)
			res.send(err);
		res.json(movies);
	});
});

router.route("/movies/:movie_id")

// delete the movie with this id (accessed at DELETE http://localhost:8080/api/movies/:movie_id)
.delete(function(req, res) {
	Movie.remove({
		_id: req.params.movie_id
	}, function(err, movie) {
		if (err)
			res.send(err);

		res.json({ message: "Successfully deleted" })
	});
});


// REGISTER ROUTES -----------------
// =============================================================================================================================================

app.use("/api", router);
app.use(express.static(path.join(__dirname, 'client/build')));

// START THE SERVER
// =============================================================================================================================================

app.listen(port);
console.log(chalk.green("========== It's going down on port " + port + " =========="));
