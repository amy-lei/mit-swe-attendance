const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'sql.mit.edu',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
});

connection.connect(error => {
    if (error) console.log(error);
    else console.log('Successfully connected to the database');
});

module.exports = connection;