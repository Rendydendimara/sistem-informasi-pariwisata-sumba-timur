const db = require('../config/db-config');

const createTableWisata = () => new Promise((resolve, reject) => {
  const sql = "CREATE TABLE IF NOT EXISTS wisata(id_wisata INT AUTO_INCREMENT PRIMARY KEY, id_kategori INT NOT NULL, nama_wisata VARCHAR(255) NOT NULL, deskripsi TEXT NOT NULL, image VARCHAR(700) NOT NULL, google_map VARCHAR(500) NOT NULL, FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori))";
  db.query(sql, (err, results) => {
    if (err) reject(err);
    else {
      console.log('Berhasil membuat table wisata');
      resolve(results);
    }
  });
});

const addWisata = ({ idKategori, namaWisata, deskripsi, image, googleMap }) => new Promise((resolve, reject) => {
  const data = {
    id_kategori: idKategori,
    nama_wisata: namaWisata,
    deskripsi: deskripsi,
    image,
    google_map: googleMap
  }
  const sql = "INSERT INTO wisata SET ?";
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})

const getAllWisata = () =>
  new Promise((resolve, reject) => {
    db.query('SELECT * FROM wisata INNER JOIN kategori ON wisata.id_kategori = kategori.id_kategori', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const getListWisata = ({ page, limit }) =>
  new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    db.query(`SELECT id_wisata, nama_wisata, deskripsi, image, nama_kategori FROM wisata INNER JOIN kategori ON wisata.id_kategori = kategori.id_kategori LIMIT ${offset},${limit}`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

const getWisataById = (idWisata) =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM wisata INNER JOIN kategori ON wisata.id_kategori = kategori.id_kategori WHERE id_wisata = ${idWisata}`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

const getWisataByKategori = (idKategori) =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM wisata INNER JOIN kategori ON wisata.id_kategori = kategori.id_kategori WHERE wisata.id_kategori = ${idKategori}`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const searchWisataByQuery = (search) =>
  new Promise((resolve, reject) => {
    db.query(`SELECT * FROM wisata WHERE nama_wisata LIKE '%${search}%'`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const deleteWisataById = (id) =>
  new Promise((resolve, reject) => {
    db.query(`DELETE FROM wisata WHERE id_wisata = ${id}`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });


const updateWisata = ({ id, idKategori, namaWisata, deskripsi, image, googleMap }) => new Promise((resolve, reject) => {
  const data = [
    idKategori,
    namaWisata,
    deskripsi,
    image,
    googleMap,
    id
  ]
  const sql = `UPDATE wisata SET id_kategori = ?, nama_wisata = ?, deskripsi = ?, image = ?, google_map = ? WHERE id_wisata = ?`;
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})

module.exports = {
  createTableWisata,
  addWisata,
  getAllWisata,
  getListWisata,
  getWisataById,
  searchWisataByQuery,
  getWisataByKategori,
  deleteWisataById,
  updateWisata
}
