const AdminModel = require("../models/Admin");
const HotelModel = require("../models/Hotel");
const WisataModel = require("../models/Wisata");


module.exports = {
  //fungsi untuk merender home page
  async getHomePage(req, res, next) {
    try {
      const adminId = req.session.passport?.user ?? 0;
      const userData = await AdminModel.getAdminById(adminId);
      res.render('index', { userData: userData ? userData : undefined, titlePage: "Sistem Informasi Pariwisata Sumba Timur" });
      return
    } catch (err) {
      next(err)
    }
  },
  //fungsi untuk merender home page
  async getKontakPage(req, res, next) {
    try {
      const adminId = req.session.passport?.user ?? 0;
      const userData = await AdminModel.getAdminById(adminId);
      res.render('kontak', { userData: userData ? userData : undefined, titlePage: "Kontak | Sistem Informasi Pariwisata Sumba Timur" });
      return
    } catch (err) {
      next(err)
    }
  },
  //fungsi untuk merender home page
  async search(req, res, next) {
    try {
      const { search } = req.body;
      const dataWisata = await WisataModel.searchWisataByQuery(search);
      const hotelWisata = await HotelModel.searchHotelByQuery(search);
      const adminId = req.session.passport?.user ?? 0;
      const userData = await AdminModel.getAdminById(adminId);
      const dataWisataFix = [];
      const listHotelFix = []

      hotelWisata.forEach(hotel => {
        listHotelFix.push({
          ...hotel,
          gambar: hotel.gambar.split(",").slice(1, hotel.gambar.split(",").length),
        })
      });
      dataWisata.forEach(wisata => {
        dataWisataFix.push({
          ...wisata,
          image: wisata.image.split(",").slice(1, wisata.image.split(",").length),
        })
      });

      res.render('search', {
        userData: userData ? userData : undefined, titlePage: "Search | Sistem Informasi Pariwisata Sumba Timur", dataWisata: dataWisataFix, dataHotel: listHotelFix, search
      });
      return
    } catch (err) {
      next(err)
    }
  },
}