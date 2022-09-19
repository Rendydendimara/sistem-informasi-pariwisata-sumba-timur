const bcrypt = require('bcryptjs');
module.exports = {
  handlePasswordHash(passowrd) {
    (new Promise((resolve, reject) => {
      bcrypt.genSalt(15, (err, salt) => {
        bcrypt.hash(passowrd, salt, (err, hash) => {
          if (err) reject(err);
          else resolve(hash);
        });
      });
    }))
  }
}
// Fungsi untuk menghashing password user
