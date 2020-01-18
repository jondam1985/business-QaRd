const mysql = require("mysql2");
require("dotenv").config(); 

const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: 3306,
	database:"o9u3fvgwqbsj7jsx"
};

module.exports = {
	mysql,
	config
};