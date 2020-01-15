// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
// const mysql = require("mysql");

// Module Dependencies
// const db_config = require("./config/connection");

// Create an instance of the express app.
var app = express();

// Added so body parser can handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, "/public")));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 9090;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes

// Use Handlebars to render the main index.html page with the plans in it.
app.get("/", function(req, res) {
	res.render("index", 
		{});
});

app.get("/userProfile", function(req, res) {
	res.render("userProfile", 
		{});
});

// will be as follows /QaRd/:username
app.get("/userResume", function(req, res) {
	res.render("userResume", 
		{
			userFirstName: "Andy",
			userLastName: "Durette",
			userEmail: "duretteandy@gmail.com",
			userPhone: "6476077597",
			userCompany: "U of T Student",
			userRole: "Full Stack Developer",
			userPortfolio: "andydurette.com",
			userLinkedIn: "https://www.linkedin.com/in/andy-durette/",
			userInstagram: "https://www.instagram.com/andy_cooks/?hl=en",
			userStyle: "carbon"
		});
});

/*  POST REQUEST */
app.post("/api/updateUser", (req, res) => {
	console.log(req.body);
	res.send("200");
});

// End of request Handling

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
	// Log (server-side) when our server has started
	console.log("Server listening on: http://localhost:" + PORT);
});