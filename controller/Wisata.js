const { APP_NAME } = require("../config");
const WisataModel = require("../models/Wisata");

const handleRenderDashboardWisata = async (req, res, next) => {
  try {
    const dataWisata = await WisataModel.getAllWisata()
    const dataWisataFix = [];
    dataWisata.forEach(wisata => {
      dataWisataFix.push({
        ...wisata,
        image: wisata.image.split(",").slice(1, wisata.image.split(",").length)
      })
    });
    res.render('dashboard-wisata', { userData: undefined, titlePage: `Dashboard Wisata | ${APP_NAME}`, dataWisata: dataWisataFix });
    return
  } catch (err) {
    next(err)
  }
}

const handleAddWisata = async (req, res, next) => {
  try {
    const { kategori, namaWisata, deskripsi, lokasiMap } = req.body
    let images = '';

    for (const file of req.files) {
      //   /**
      //    * sekarang gambar sudah diupload, maka isi dari req.files berupa hasil gambar yang sudah diupload kedalam cloudunary
      //    * ini karena kita sudah membuat fitur(middleware) cloudinary storage upload, dimana akan otomasi mengupload file/gambar jika gambar ditambahkan/ubah.
      //    * tambahkan data gambar yang dimuat di cloudinary kedalam properti array req.body.product.images
      //    */
      images = `${images},${String(file.path)}`;
    }
    // if (id_kategori && nama_wisata && google_map) {
    await WisataModel.addWisata({
      idKategori: Number(kategori),
      namaWisata: namaWisata,
      deskripsi: deskripsi,
      image: images,
      googleMap: lokasiMap
    });
    // }
    res.redirect('/dashboard/wisata');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

module.exports = {
  handleRenderDashboardWisata,
  handleAddWisata
};