const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const controllers = require("./controller/controller.js");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
const PORT = process.env.PORT || 9090;
const TIME = 1000 * 60 * 15;
const {

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

app.get("/userProfile/:user" , redirectLogin,  async (req,res)=>{
	const {user} = req.params;
	const data = await controllers.getUserProfile(user);
	const result = await controllers.userProfileExists(data);
	if (result === false) {
		res.render("userProfile",{
			username: data.userName,
			url: null,
			diactivated:"diactivated",
			carbonCard: "checked",
		});
	} else {

		let carbonCard; let trendyCard ;
		let geometryCard; let standardCard;

		if ( result["cardStyle"] === "carbon"){
			carbonCard = "checked";
		} else if  ( result["cardStyle"] === "trendy") {
			trendylCard = "checked";
		} else if  ( result["cardStyle"] === "geometry"){
			geometryCard = "checked";
		}else if  ( result["cardStyle"] === "standard") {
			standardCard = "checked";
		}
		res.render("userProfile",{
			username: data.userName,
			firstname: result["first_name"],
			lastname: result["last_name"],
			email: result["email"],
			phone: result["phone"],
			role: result["role"],
			company: result["company"],
			linkedin: result["linkedin"],
			portfolio: result["portfolio"],
			instagram: result["instagram"],
			carbonCard: carbonCard,
			trendyCard: trendyCard,
			geometryCard: geometryCard,
			standardCard: standardCard,
			url: `${ req.headers.host + "/QaRd/" + result["unique_id"] }`   
		});
	}
});


app.post("/api/updateUser" ,redirectLogin, async (req,res)=>{
	let submitedData = req.body;
	const uniq_id = req.session.userId;
	submitedData = controllers.cleanUserData(submitedData);
	if (submitedData === false) {
		res.status(400).send();
	} else {
		controllers.submitTheData(submitedData , uniq_id );
		setTimeout(()=>{res.status(200).send({OK:"OK"});},500);
	}
});


// will be as follows /QaRd/:username
app.get("/QaRd/:id", async (req, res) => {
	const {id} = req.params;
	const data = await controllers.getUserProfile(id);
	const result = await controllers.userProfileExists(data);
	if (result === undefined){
		res.status(404).send();
	} else {

		let carbonCard; let trendyCard ;
		let geometryCard; let standardCard;

		if ( result["cardStyle"] === "carbon"){
			carbonCard = true;
		} else if  ( result["cardStyle"] === "trendy") {
			trendyCard = true;
		} else if  ( result["cardStyle"] === "geometry"){
			geometryCard = true;
		}else if  ( result["cardStyle"] === "standard") {
			standardCard = true;
		}
		res.render("userResume",{
			carbon:carbonCard,
			geometry:geometryCard,
			trendy:trendyCard,
			simple:standardCard,
			userFirstName: result["first_name"],
			userLastName: result["last_name"],
			userEmail: result["email"],
			userPhone: result["phone"],
			userRole: result["role"],
			userCompany: result["company"],
			userLinkedIn: result["linkedin"],
			userPortfolio: result["portfolio"],
			userInstagram: result["instagram"]
		});
	}
});



app.listen(PORT, function() {
	// Log (server-side) when our server has started
	console.log("Server listening on: http://localhost:" + PORT);
});