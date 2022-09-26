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

module.exports = {
  createTableWisata,
  addWisata,
  getAllWisata
}
