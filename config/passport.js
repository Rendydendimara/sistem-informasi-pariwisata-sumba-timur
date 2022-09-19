const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db-config');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'nomor_telpon' }, (nomor_telpon, password, done) => {
			console.log(nomor_telpon);
			console.log(password);
			// cari user di database
			db.query('SELECT * FROM users WHERE nomor_telpon = ? LIMIT 1', [String(nomor_telpon)], (err, user) => {
				console.log('user', user)

				if (!user) {
					// Email akun belum terdaftar
					// Kembalikan error
					return done(null, false, { message: 'Password atau Nomor Telfon anda salah' });
				}
				else {
					if (user.length === 0) {
						console.log('Error => Nomor Telfon belum terdaftar');
						// Email akun belum terdaftar
						// Kembalikan error
						return done(null, false, { message: 'Password atau Nomor Telfon anda salah' });
					} else {
						// Email akun user ada 
						// Tinggal kita cocokan password
						console.log('user[0].password', user[0].password)
						bcrypt.compare(password, user[0].password, (err, isMatch) => {
							if (err) throw err; // 500 status code
							console.log('isMatch', isMatch)
							if (isMatch) {
								// password user benar
								// kembalikan data milik user dan user memiliki session
								return done(null, user[0]);
							} else {
								// password user salah
								// kembalikan error
								return done(null, false, { message: 'Password atau Nomor Telfon anda salah' });
							}
						});
					}
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
		db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [Number(id)], (err, user) => {
			done(err, user[0]);
		});
	});
};
