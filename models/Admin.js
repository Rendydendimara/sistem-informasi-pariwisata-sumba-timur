const db = require('../config/db-config');
const { handlePasswordHash } = require('../utils/password');

const createTableAdmin = () => new Promise((resolve, reject) => {
  const sql = "CREATE TABLE IF NOT EXISTS admin(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL)";
  db.query(sql, (err, results) => {
    if (err) reject(err);
    else {
      console.log('Berhasil membuat table admin')
      resolve(results)
    };
  });
});

const addAdmin = ({ username, password }) => new Promise(async (resolve, reject) => {
  const passwordHashed = await handlePasswordHash(password)
  const data = { username, password: passwordHashed }
  const sql = "INSERT INTO admin SET ?";
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
});

const getAdminById = (id) =>
  new Promise((resolve, reject) => {
    const sql = "SELECT * FROM admin WHERE id = ?";
    db.query(sql, id, (err, results) => {
      if (err) reject(err);
      else {
        if (results.length == 1) {
          resolve(results[0]);
        } else {
          resolve(false);
        }
      };
    });
  });


module.exports = {
  createTableAdmin,
  addAdmin,
  getAdminById
}