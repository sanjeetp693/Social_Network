require('dotenv').config();
var mysql =  require('mysql');
var connection = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE
});

connection.connect(function(err){
    if(!err){
        console.log("Database is connected");

    } else{
        console.log("Error while connecting with database");
    }
});
module.exports = connection;
