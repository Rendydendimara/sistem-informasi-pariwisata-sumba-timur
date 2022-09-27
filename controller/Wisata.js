const { APP_NAME } = require("../config");
const WisataModel = require("../models/Wisata");
const KategoriModel = require("../models/Kategori");

const handleRenderDashboardWisata = async (req, res, next) => {
  try {
    const dataKategori = await KategoriModel.getAllKategori()
    const dataWisata = await WisataModel.getAllWisata()
    const dataWisataFix = [];
    dataWisata.forEach(wisata => {
      dataWisataFix.push({
        ...wisata,
        image: wisata.image.split(",").slice(1, wisata.image.split(",").length)
      })
    });
    res.render('dashboard-wisata', { userData: undefined, titlePage: `Dashboard Wisata | ${APP_NAME}`, dataWisata: dataWisataFix, dataKategori });
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

const handleRenderListWisata = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const listWisata = await WisataModel.getListWisata({ page: page, limit: 5 })
    const listWisataFix = []
    listWisata.forEach(wisata => {
      listWisataFix.push({
        ...wisata,
        deskripsi: wisata.deskripsi.slice(0, 128),
        image: wisata.image.split(",").slice(1, wisata.image.split(",").length)
      })
    });
    res.render('wisata', { userData: undefined, titlePage: `List Wisata | ${APP_NAME}`, listWisata: listWisataFix });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderDetailWisata = async (req, res, next) => {
  try {
    const idWisata = req.params.idWisata;
    const wisata = await WisataModel.getWisataById(idWisata);
    const fixWisata = {
      ...wisata[0],
      image: wisata[0].image.split(",").slice(1, wisata[0].image.split(",").length)
    }
    res.render('wisata-detail', { userData: undefined, titlePage: `Detail Wisata | ${APP_NAME}`, wisata: fixWisata });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

module.exports = {
  handleRenderDashboardWisata,
  handleAddWisata,
  handleRenderListWisata,
  handleRenderDetailWisata
};