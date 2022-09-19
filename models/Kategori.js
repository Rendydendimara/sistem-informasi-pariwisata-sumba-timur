const db = require('../config/db-config');

const createTableKategori = () => new Promise((resolve, reject) => {
  const sql = "CREATE TABLE IF NOT EXISTS kategori(id_kategori INT AUTO_INCREMENT PRIMARY KEY, nama_kategori VARCHAR(255) NOT NULL";
  db.query(sql, (err, results) => {
    if (err) reject(err);
    else {
      console.log('Berhasil membuat table kategori');
      resolve(results);
    }
  });
});

const addKategori = (namaKategori) => new Promise((resolve, reject) => {
  const data = {
    nama_kategori: namaKategori,
  }
  const sql = "INSERT INTO kategori SET ?";
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})

const getAllKategori = () =>
  new Promise((resolve, reject) => {
    db.query('SELECT * FROM kategori', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

module.exports = {
  createTableKategori,
  addKategori,
  getAllKategori
}
