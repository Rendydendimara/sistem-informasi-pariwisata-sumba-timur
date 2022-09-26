const mysql = require('mysql');

const db = mysql.createPool({
	host: 'sql6.freemysqlhosting.net', // '85.10.205.173', //'localhost',
	port: 3306,
	user: 'sql6520714',// 'waingapucoder', //'root',
	password: 'xeTheFhKqJ', // 'R3ndydinarcoder', // '', 'e0u4mv!G)$X@uf2V'
	database: 'sql6520714',// 'waingapucoder_db',// 'si_pariwisata_sumba_timur'
	// host: 'localhost',
	// port: 3306,
	// user: 'root',
	// password: '',
	// database: 'si_pariwisata_sumba_timur',
	connectionLimit: 1000,
	connectTimeout: 60 * 60 * 1000,
	acquireTimeout: 60 * 60 * 1000,
	timeout: 60 * 60 * 1000,
});

module.exports = db;