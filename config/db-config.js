const mysql = require('mysql');

const db = mysql.createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'si_pariwisata_sumba_timur'
});

module.exports = db;