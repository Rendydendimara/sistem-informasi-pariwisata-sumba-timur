const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db-config');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
			// cari user di database
			db.query('SELECT * FROM admin WHERE username = ? LIMIT 1', [String(username)], (err, user) => {
				const selectedUser = user[0]
				if (!selectedUser) {
					// Email akun belum terdaftar
					// Kembalikan error
					return done(null, false, { message: 'Password atau Username Salah' });
				}
				else {
					// Email akun user ada 
					// Tinggal kita cocokan password
					bcrypt.compare(password, selectedUser.password, (err, isMatch) => {
						if (err) throw err; // 500 status code
						if (isMatch) {
							// password user benar
							// kembalikan data milik user dan user memiliki session
							return done(null, selectedUser);
						} else {
							// password user salah
							// kembalikan error
							return done(null, false, { message: 'Password atau Username Salah' });
						}
					});
				}
			});
		})
	);

	// serializeUser
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// deserializeUser
	passport.deserializeUser((id, done) => {
		db.query('SELECT * FROM admin WHERE id = ? LIMIT 1', [Number(id)], (err, user) => {
			done(err, user[0]);
		});
	});
};
