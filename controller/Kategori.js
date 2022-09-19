const KategoriModel = require("../models/Kategori");

const handleAddKategori = async (req, res, next) => {
  try {
    const { nama_kategori } = req.body
    if (id_kategori && nama_wisata && google_map) {
      await KategoriModel.addKategori(nama_kategori);
    }
    res.redirect('/dashbord/kategori');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

module.exports = {
  handleAddKategori
};