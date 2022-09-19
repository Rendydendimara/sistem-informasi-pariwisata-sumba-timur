const HotelModel = require("../models/Hotel");

const handleAddHotel = async (req, res, next) => {
  try {
    const { nama_hotel, deskripsi, gambar, google_map } = req.body

    if (nama_hotel && deskripsi && google_map) {
      await HotelModel.addHotel({
        namaHotel: nama_hotel,
        deskripsi: deskripsi,
        googleMap: google_map,
        gambar: gambar
      });
    }
    res.redirect('/dashbord/hotel');
  } catch (err) {
    console.log('err')
    next(err)
  }
}


module.exports = {
  handleAddHotel
};