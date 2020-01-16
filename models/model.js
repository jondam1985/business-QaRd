const {mysql , config} = require("../database/db_config.js");

//this function makes querying to databse easy
const db = async (query) => {
	let result;
	const con = await mysql.createConnection(config);
	await con.promise().query(query)
		.then(res => { result = res;})
		.catch(err=>{ result = err; })
		.then( con.end() );
	return (result);
};

const getUser = async (user) => {
	const query = `select * from users where username = '${user}'`;
	const result = await db(query);
  
	if ( !result[0].length ){
		return false;
	} else {
		return result[0];
	}
};

const insert = async ( uuid , user, hashCode ) => {
	let query = `insert into users (unique_id , username, hashCode) values ( '${uuid}' , '${user}' , '${hashCode}' )`;
	await db(query);
	query = `select * from users where username = '${user}' and hashCode = '${hashCode}'`;
	const result = await db(query);
	return result[0];
};

const getProfile = async (userId) => {
	const query = `select * from users where unique_id = '${userId}'`;
	const result = await db(query);
	return result[0];
};

const checkUserProfileExists = async (uniq_id) => {
	let query = `select * from user_profiles where unique_id = '${uniq_id}'`;
	const result = await db(query);
	if( result.errno ){
		return false;
	} else {
		return result[0];
	}
};

const createNewUserProfile = async (submitedData , uniq_id) => {
	const {
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

	let query = `
    INSERT INTO user_profiles (unique_id , first_name , last_name , email , phone , role , company , linkedin , portfolio , instagram , cardStyle)
    VALUES ( '${uniq_id}' , '${userFirstName}' , '${userLastName}' , '${userEmail}' , '${userPhone}' ,
    '${userRole}' , '${userCompany}' , '${userLinkedIn}' , '${userPortfolio}' ,  '${userInstagram}' ,
      '${userStyle}' );
  `;

	const result = await db(query);
	if( result.errno ){
		return false;
	} else {
		return result;
	}
};

const updateExistingUserProfile = async (submitedData , uniq_id) => {
	const {
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

	const query = `
    UPDATE user_profiles SET first_name = '${userFirstName}' , 
    last_name = '${userLastName}' , email = '${userEmail}' , phone = '${userPhone}' , role = '${userRole}' ,
     company = '${userCompany}' , linkedin = '${userLinkedIn}', portfolio = '${userPortfolio}', instagram = '${userInstagram}', cardStyle= '${userStyle}' 
    where unique_id = '${uniq_id}';
  `;
	const result = await db(query); 
	if( result.errno ){
		return false;
	} else {
		return result;
	}
};

exports.module = {
	query : {
		getUser,
		getProfile,
		insert,
		checkUserProfileExists,
		createNewUserProfile,
		updateExistingUserProfile
	}
};