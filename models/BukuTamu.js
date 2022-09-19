const db = require('../config/db-config');

const createTableBukuTamu = () => new Promise((resolve, reject) => {
  const sql = "CREATE TABLE IF NOT EXISTS buku_tamu(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) NOT NULL, tanggapan TEXT NOT NULL)";
  db.query(sql, (err, results) => {
    if (err) reject(err);
    else {
      console.log('Berhasil membuat table buku tamu');
      resolve(results);
    }
  });
});

const addBukuTamu = ({ email, tanggapan }) => new Promise((resolve, reject) => {
  const data = { email, tanggapan }
  const sql = "INSERT INTO buku_tamu SET ?";
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})

const getAllBukuTamu = () =>
  new Promise((resolve, reject) => {
    db.query('SELECT * FROM buku_tamu', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

module.exports = {
  createTableBukuTamu,
  addBukuTamu,
  getAllBukuTamu
}
