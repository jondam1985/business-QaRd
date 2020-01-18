const query = require("../models/model.js").module.query;
const uuidv1 = require("uuid/v1");
const bcrypt = require("bcryptjs");

const dataCleaner = async (...data) => {
	let newData =  data.map(  (a) => { 
		return a.replace(/ /g,"");
	});
	return newData;
};

const cleanUserData = (submitedData) => {
	let {
		userFirstName,
		userLastName,
		userEmail,
		userPhone,
		userCompany,
		userRole,

		userPortfolio,
		userLinkedIn,
		userInstagram,
		userStyle
	} = submitedData;

	if (
		userFirstName.replace(/\s/g, "") === "" ||
    userLastName.replace(/\s/g, "") === "" ||
    userEmail.replace(/\s/g, "") === "" ||
    userPhone.replace(/\s/g, "") === "" ||
    userCompany.replace(/\s/g, "") === "" || 
    userRole.replace(/\s/g, "") === ""
	)
	{
		return false;
	} else {
		// userFirstName=userFirstName.replace(/\s/g, ''),
		// userLastName=userLastName.replace(/\s/g, ''),
		// userEmail=userEmail.replace(/\s/g, ''),
		// userPhone=userPhone.replace(/\s/g, ''),
		// userCompany=userCompany.replace(/\s/g, ''),
		// userRole=userRole.replace(/\s/g, ''),
  
		// userPortfolio=userPortfolio.replace(/\s/g, ''),
		// userLinkedIn=userLinkedIn.replace(/\s/g, ''),
		// userInstagram=userInstagram.replace(/\s/g, ''),
		// userStyle=userStyle.replace(/\s/g, '')

		return {
			userFirstName,
			userLastName,
			userEmail,
			userPhone,
			userCompany,
			userRole,
			userPortfolio,
			userLinkedIn,
			userInstagram,
			userStyle
		};
	}
};

const userExists = async (user) => {
	let result = await query.getUser(user);
	if (result === false) {
		return false;
	} else {
		return result;
	}
};

const handleSignIn = async (req, res, result , user , pass) => {
	if ((bcrypt.compareSync(pass, result[0]["hashCode"])) === true){
		req.session.userId = result[0]["unique_id"];
		res.send({goTo: `userProfile/${result[0]["unique_id"]}`});
		return;
	} else {
		return res.status(422).send();
	}
};

const handleSignUp = async (user , pass) => {
	const hash = await hasher(pass);
	const result = await query.insert( uuidv1() , user, hash);
	return result[0];  
};

const getUserProfile = async (userId) => {
	const result = await query.getProfile(userId);
	return result[0];
};


const hasher = (myPlaintextPassword) => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(myPlaintextPassword, salt);
	return hash;
};


const submitTheData = async (submitedData , uniq_id ) => {
	const result = await query.checkUserProfileExists(uniq_id);
	if ( !result.length ){
		// doesnt exists, must create
		const response = query.createNewUserProfile(submitedData , uniq_id);
		if (response === false){
			//send error msg
		} else {
			//refresh page
		}
	} else {
		//does exist, must update
		const res = query.updateExistingUserProfile(submitedData , uniq_id);
		if (res === false){
			//send error msg
		} else {
			//refresh page
		}
	}
};

const userProfileExists = async (data)=>{
	let result;
	if (data){
		result = await query.checkUserProfileExists(data["unique_id"]);
		if(result.length){
			return result[0];
		} else {
			return false;
		}
	}
};

const deleteRecordOf = async (userId) => {
	const result = await query.deleter(userId);
	if (result === true) {
		return true;
	} else if (result === false) {
		return false;
	}
};

module.exports = {
	userExists,
	handleSignIn,
	handleSignUp,
	dataCleaner,
	cleanUserData,
	getUserProfile,
	submitTheData,
	userProfileExists,
	deleteRecordOf
};