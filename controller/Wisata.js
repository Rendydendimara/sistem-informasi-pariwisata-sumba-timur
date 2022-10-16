const { APP_NAME } = require("../config");
const WisataModel = require("../models/Wisata");
const KategoriModel = require("../models/Kategori");
const HotelModel = require("../models/Hotel");
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
    res.render('dashboard-wisata', { userData: true, titlePage: `Dashboard Wisata | ${APP_NAME}`, dataWisata: dataWisataFix, dataKategori });
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
    const adminId = req.session.passport?.user ?? 0;
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
    res.render('wisata', { userData: adminId, titlePage: `List Wisata | ${APP_NAME}`, listWisata: listWisataFix });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderDetailWisata = async (req, res, next) => {
  try {
    const adminId = req.session.passport?.user ?? 0;
    const idWisata = req.params.idWisata;
    const wisata = await WisataModel.getWisataById(idWisata);
    const fixWisata = {
      ...wisata[0],
      image: wisata[0].image.split(",").slice(1, wisata[0].image.split(",").length)
    }
    const listHotel = await HotelModel.getListHotel({ page: 1, limit: 2 })
    const listHotelFix = []
    listHotel.forEach(hotel => {
      listHotelFix.push({
        ...hotel,
        deskripsi: hotel.deskripsi.slice(0, 128),
        gambar: hotel.gambar.split(",").slice(1, hotel.gambar.split(",").length)
      })
    });
    res.render('wisata-detail', { userData: adminId, titlePage: `Detail Wisata | ${APP_NAME}`, wisata: fixWisata, dataHotel: listHotelFix });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleFindWisataByKategori = async (req, res, next) => {
  try {
    const adminId = req.session.passport?.user ?? 0;
    const categori = req.query.type;
    const dataCategori = await KategoriModel.getKategoriByName(categori);
    const listWisata = await WisataModel.getWisataByKategori(dataCategori[0].id_kategori)
    const listWisataFix = []
    listWisata.forEach(wisata => {
      listWisataFix.push({
        ...wisata,
        deskripsi: wisata.deskripsi.slice(0, 128),
        image: wisata.image.split(",").slice(1, wisata.image.split(",").length)
      })
    });
    res.render('categori', { userData: adminId, titlePage: `List Wisata | ${APP_NAME}`, listWisata: listWisataFix, categori });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleDeleteWisata = async (req, res, next) => {
  try {
    const idWisata = req.params.idWisata;
    await WisataModel.deleteWisataById(Number(idWisata))
    res.redirect('/dashboard/wisata');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderUpdateDetailWisata = async (req, res, next) => {
  try {
    const idWisata = req.params.idWisata;
    const wisata = await WisataModel.getWisataById(idWisata);
    const fixWisata = {
      ...wisata[0],
      image: wisata[0].image.split(",").slice(1, wisata[0].image.split(",").length),
      oldImage: wisata[0].image
    }
    const dataKategori = await KategoriModel.getAllKategori()
    res.render('dashboard-wisata-ubah', {
      userData: true, titlePage: `Update Wisata | ${APP_NAME}`, wisata: fixWisata, dataKategori
    });
  } catch (err) {
    console.log('err')
    next(err)
  }
}


const handleUpdateWisata = async (req, res, next) => {
  try {
    const { kategori, namaWisata, deskripsi, lokasiMap, oldImage, id_wisata } = req.body
    let images = '';
    if (req.files.length === 0) {
      images = `,${oldImage}`
    } else {
      for (const file of req.files) {
        //   /**
        //    * sekarang gambar sudah diupload, maka isi dari req.files berupa hasil gambar yang sudah diupload kedalam cloudunary
        //    * ini karena kita sudah membuat fitur(middleware) cloudinary storage upload, dimana akan otomasi mengupload file/gambar jika gambar ditambahkan/ubah.
        //    * tambahkan data gambar yang dimuat di cloudinary kedalam properti array req.body.product.images
        //    */
        images = `${images},${String(file.path)}`;
      }
    }
    // if (id_kategori && nama_wisata && google_map) {
    await WisataModel.updateWisata({
      id: Number(id_wisata),
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
  handleAddWisata,
  handleRenderListWisata,
  handleRenderDetailWisata,
  handleFindWisataByKategori,
  handleDeleteWisata,
  handleRenderUpdateDetailWisata,
  handleUpdateWisata
};