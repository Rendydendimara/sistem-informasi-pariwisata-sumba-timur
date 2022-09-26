const db = require('../config/db-config');

const createTableHotel = () => new Promise((resolve, reject) => {
  const sql = "CREATE TABLE IF NOT EXISTS hotel(id_hotel INT AUTO_INCREMENT PRIMARY KEY, nama_hotel VARCHAR(255) NOT NULL, deskripsi TEXT NOT NULL, gambar VARCHAR(700) NOT NULL, google_map VARCHAR(500) NOT NULL)";
  db.query(sql, (err, results) => {
    if (err) reject(err);
    else {
      console.log('Berhasil membuat table hotel');
      resolve(results);
    }
  });
});

const addHotel = ({ namaHotel, deskripsi, gambar, googleMap }) => new Promise((resolve, reject) => {
  const data = {
    nama_hotel: namaHotel,
    deskripsi: deskripsi,
    gambar: gambar,
    google_map: googleMap
  }
  const sql = "INSERT INTO hotel SET ?";
  db.query(sql, data, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
})

const getAllHotel = () =>
  new Promise((resolve, reject) => {
    db.query('SELECT * FROM hotel', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

module.exports = {
  createTableHotel,
  addHotel,
  getAllHotel
}
