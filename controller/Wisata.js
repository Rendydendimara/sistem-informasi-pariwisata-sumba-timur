const WisataModel = require("../models/Wisata");

const handleAddWisata = async (req, res, next) => {
  try {
    const { id_kategori, nama_wisata, deskripsi, image, google_map } = req.body

    if (id_kategori && nama_wisata && google_map) {
      await WisataModel.addWisata({
        idKategori: id_kategori,
        namaWisata: nama_wisata,
        deskripsi: deskripsi,
        image: image,
        googleMap: google_map
      });
    }
    res.redirect('/dashbord/wisata');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

module.exports = {
  handleAddWisata
};