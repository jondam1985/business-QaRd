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

const dbDelete = async ({a,b,c}) => {
	let error;
	const con = await mysql.createConnection(config);
	await con.promise().query(a).catch(err=>{console.log(err) ; error = err;});
	await con.promise().query(b).catch(err=>{console.log(err) ; error = err;});
	await con.promise().query(c).catch(err=>{console.log(err) ; error = err;}).then(con.end());
	if (error === undefined){
		return true;
	}
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

const deleter = async (unique_id) => {
	const a = "SET foreign_key_checks = 0";
	const b = `DELETE FROM users where unique_id = '${unique_id}'`;
	const c = `DELETE FROM user_profiles where 'unique_id' = '${unique_id}'`;
	const query = {a,b,c};
	const result = await dbDelete(query);
	if (result === true){
		return true;
	} else {
		return false;
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
		updateExistingUserProfile,
		deleter
	}
};