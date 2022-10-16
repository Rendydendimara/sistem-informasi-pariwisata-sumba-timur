const db = require('../config/db-config');

const createTableKategori = () => new Promise((resolve, reject) => {
  const sql = "CREATE TABLE IF NOT EXISTS kategori(id_kategori INT AUTO_INCREMENT PRIMARY KEY, nama_kategori VARCHAR(255), is_deleted BOOL NOT NULL)";
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
    is_deleted: false
  }
  const sql = "INSERT INTO kategori SET ?";
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})

const getAllKategori = () =>
  new Promise((resolve, reject) => {
    db.query('SELECT * FROM `kategori` WHERE is_deleted = 0', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const getKategoriByName = (name) =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM kategori WHERE nama_kategori = '${name}'`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const deleteKategoriById = (id) =>
  new Promise(async (resolve, reject) => {
    db.query(`UPDATE kategori SET is_deleted = 1 WHERE id_kategori = ${id} `, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const updateKategori = ({ id, namaKategori }) => new Promise((resolve, reject) => {
  const data = [
    namaKategori,
    id,
  ]
  const sql = `UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?`;
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})


const getKategoriById = (id) =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM kategori WHERE id_kategori = '${id}'`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


module.exports = {
  createTableKategori,
  addKategori,
  getAllKategori,
  getKategoriByName,
  deleteKategoriById,
  updateKategori,
  getKategoriById
}
