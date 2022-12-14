const { APP_NAME } = require("../config");
const HotelModel = require("../models/Hotel");
const WisataModel = require("../models/Wisata");
const handleRenderDashboardHotel = async (req, res, next) => {
  try {
    const adminId = req.session.passport?.user ?? 0;
    const dataHotel = await HotelModel.getAllHotel()
    const dataHoteFix = [];
    dataHotel.forEach(hotel => {
      dataHoteFix.push({
        ...hotel,
        gambar: hotel.gambar.split(",").slice(1, hotel.gambar.split(",").length)
      })
    });
    res.render('dashboard-hotel', { userData: adminId, titlePage: `Dashboard Hotel | ${APP_NAME}`, dataHotel: dataHoteFix });
    return
  } catch (err) {
    next(err)
  }
}

const handleAddHotel = async (req, res, next) => {
  try {
    const { namaHotel, deskripsi, lokasiMap } = req.body
    let images = '';

    for (const file of req.files) {
      //   /**
      //    * sekarang gambar sudah diupload, maka isi dari req.files berupa hasil gambar yang sudah diupload kedalam cloudunary
      //    * ini karena kita sudah membuat fitur(middleware) cloudinary storage upload, dimana akan otomasi mengupload file/gambar jika gambar ditambahkan/ubah.
      //    * tambahkan data gambar yang dimuat di cloudinary kedalam properti array req.body.product.images
      //    */
      images = `${images},${String(file.path)}`;
    }
    await HotelModel.addHotel({
      namaHotel: namaHotel,
      deskripsi: deskripsi,
      gambar: images,
      googleMap: lokasiMap
    });
    res.redirect('/dashboard/hotel');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderListHotel = async (req, res, next) => {
  try {
    const adminId = req.session.passport?.user ?? 0;
    const page = Number(req.query.page) || 1;
    const listHotel = await HotelModel.getListHotel({ page: page, limit: 5 })
    const listHotelFix = []
    listHotel.forEach(hotel => {
      listHotelFix.push({
        ...hotel,
        deskripsi: hotel.deskripsi.slice(0, 128),
        gambar: hotel.gambar.split(",").slice(1, hotel.gambar.split(",").length)
      })
    });
    res.render('hotel', { userData: adminId, titlePage: `List Hotel | ${APP_NAME}`, listHotel: listHotelFix });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderDetailHotel = async (req, res, next) => {
  try {
    const adminId = req.session.passport?.user ?? 0;
    const idHotel = req.params.idHotel;
    const hotel = await HotelModel.getHotelById(idHotel);
    const fixHotel = {
      ...hotel[0],
      gambar: hotel[0].gambar.split(",").slice(1, hotel[0].gambar.split(",").length)
    }
    const listWisata = await WisataModel.getListWisata({ page: 1, limit: 2 })
    const listWisataFix = []
    listWisata.forEach(wisata => {
      listWisataFix.push({
        ...wisata,
        deskripsi: wisata.deskripsi.slice(0, 128),
        image: wisata.image.split(",").slice(1, wisata.image.split(",").length)
      })
    });
    res.render('hotel-detail', { userData: adminId, titlePage: `Detail Hotel | ${APP_NAME}`, hotel: fixHotel, dataWisata: listWisataFix });
  } catch (err) {
    console.log('err')
    next(err)
  }
}


const handleDeleteHotel = async (req, res, next) => {
  try {
    const idHotel = req.params.idHotel;
    await HotelModel.deleteHotelById(Number(idHotel))
    res.redirect('/dashboard/hotel');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderUpdateHotel = async (req, res, next) => {
  try {
    const idHotel = req.params.idHotel;
    const hotel = await HotelModel.getHotelById(idHotel);
    const fixHotel = {
      ...hotel[0],
      gambar: hotel[0].gambar.split(",").slice(1, hotel[0].gambar.split(",").length)
    }
    res.render('dashboard-hotel-ubah', {
      userData: true, titlePage: `Update Hotel | ${APP_NAME}`, hotel: fixHotel
    });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleUpdateHotel = async (req, res, next) => {
  try {
    const { namaHotel, deskripsi, lokasiMap, oldImage, id_hotel } = req.body
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
    await HotelModel.updateHotel({
      hotelId: Number(id_hotel),
      namaHotel: namaHotel,
      deskripsi: deskripsi,
      gambar: images,
      googleMap: lokasiMap
    });
    // }
    res.redirect('/dashboard/hotel');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

module.exports = {
  handleRenderDashboardHotel,
  handleAddHotel,
  handleRenderListHotel,
  handleRenderDetailHotel,
  handleDeleteHotel,
  handleRenderUpdateHotel,
  handleUpdateHotel
};