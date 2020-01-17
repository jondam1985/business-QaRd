const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const controllers = require("./controller/controller.js");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const TIME = 1000 * 60 * 15;
const {
	PORT = 9090,

	//cookie related
	SESS_NAME = "sid",
	SESS_SECRET = "thisIsTheSecretKey",
	SESS_LIFETIME = TIME //set to 15 minutes
} = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
	name: SESS_NAME,
	resave: false, //dont store if cookie was not modified
	saveUninitialized: false, //dont store empty cookies
	secret: SESS_SECRET, // the key to sign the cookie
	cookie:{
		maxAge: SESS_LIFETIME, //life-time of cookie is 15 minutes
		sameSite: true, //only accepts cookies from the same domain
	}
}));



//this function will redirect the users to the login if they are not authenticated
const redirectLogin = (req,res,next) => {
	if (!req.session.userId) {
		res.redirect("/");
	} else {
		next();
	}
};

app.get("/", function(req, res) {
	res.render("index", 
		{});
});

app.get("/signIn" , ( req, res )=>{
	res.render("signIn");
});


app.post("/signIn" , async (req,res)=>{
	const userData = await controllers.dataCleaner(req.body.user, req.body.pass);
	const user = userData[0]; const pass = userData[1];
	const result = await controllers.userExists(user);
	if ( result === false ){
		return res.status(404).send();
	} else {
		await controllers.handleSignIn(req, res, result , user , pass);
	}
});


app.post("/signUp" , async (req,res) => {
	const userData = await controllers.dataCleaner(req.body.user, req.body.pass);
	const user = userData[0]; const pass = userData[1];
	let result = await controllers.userExists(user,pass,"signUp");
	if ( result === false) {
		await controllers.handleSignUp(user, pass);
		return res.status(200).send();
	} else {
		return res.status(400).send();
	}
});

app.get("/logout" , async (req, res) => {
	req.session.destroy(err=>{
		if (err) {
			return res.redirect("/signIn");
		}

		res.clearCookie(SESS_NAME);
		res.redirect("/signIn");
	});
});

app.get("/userProfile/:user" , redirectLogin , async (req,res)=>{
	const {user} = req.params;
	const data = await controllers.getUserProfile(user);
	res.render("userProfile",{
		username: data.userName
	});
});

app.post("/api/updateUser" ,redirectLogin, async (req,res)=>{
	let submitedData = req.body;
	const uniq_id = req.session.userId;
	submitedData = controllers.cleanUserData(submitedData);
	if (submitedData === false) {
		res.status(400).send();
	} else {
		controllers.submitTheData(submitedData , uniq_id );
	}
});

// will be as follows /QaRd/:username
app.get("/userResume", function(req, res) {

	userStyle = "geometry";
	let carbon = false;
	let geometry = false;
	let trendy = false;
	let simple = false;

	if (userStyle === "carbon"){
		carbon = true
	}

	if (userStyle === "geometry"){
		geometry = true
	}

	if (userStyle === "trendy"){
		trendy = true
	}

	if (userStyle === "simple"){
		simple = true
	}

	res.render("userResume", 
		{
			userFirstName: "John",
			userLastName: "Doe",
			userEmail: "JohnDoe@gmail.com",
			userPhone: "456-4567-4567",
			userCompany: "Point & Shoot",
			userRole: "Photographer",
			userPortfolio: "johndoephotography.com",
			userLinkedIn: "https://www.linkedin.com/in/john-doe/",
			userInstagram: "https://www.instagram.com/john_doe_photography/?hl=en",
			carbon: carbon,
			geometry: geometry,
			trendy: trendy,
			simple: simple
		});
});

// /*  POST REQUEST */
// app.post("/api/updateUser", redirectLogin, (req, res) => {
// 	console.log(req.body);
// 	res.send("200");
// });



app.listen(PORT, function() {
	// Log (server-side) when our server has started
	console.log("Server listening on: http://localhost:" + PORT);
});