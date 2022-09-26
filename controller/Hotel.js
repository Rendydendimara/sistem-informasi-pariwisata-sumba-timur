const { APP_NAME } = require("../config");
const HotelModel = require("../models/Hotel");

const handleRenderDashboardHotel = async (req, res, next) => {
  try {
    const dataHotel = await HotelModel.getAllHotel()
    const dataHoteFix = [];
    dataHotel.forEach(hotel => {
      dataHoteFix.push({
        ...hotel,
        gambar: hotel.gambar.split(",").slice(1, hotel.gambar.split(",").length)
      })
    });
    console.log(dataHotel)
    res.render('dashboard-hotel', { userData: undefined, titlePage: `Dashboard Hotel | ${APP_NAME}`, dataHotel: dataHoteFix });
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

module.exports = {
  handleRenderDashboardHotel,
  handleAddHotel
};