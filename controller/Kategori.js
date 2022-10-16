const { APP_NAME } = require("../config");
const KategoriModel = require("../models/Kategori");

const handleRenderDashboardKategori = async (req, res, next) => {
  try {
    const dataKategori = await KategoriModel.getAllKategori()
    res.render('dashboard-kategori', { userData: true, titlePage: `Dashboard Kategori | ${APP_NAME}`, dataKategori });
    return
  } catch (err) {
    next(err)
  }
}

const handleAddKategori = async (req, res, next) => {
  try {
    const { namaKategori } = req.body
    await KategoriModel.addKategori(namaKategori);
    res.redirect('/dashboard/kategori');
  } catch (err) {
    console.log('err')
    next(err)
  }
}


const handleDeleteKategori = async (req, res, next) => {
  try {
    const idKategori = req.params.idKategori;
    await KategoriModel.deleteKategoriById(Number(idKategori))
    res.redirect('/dashboard/kategori');
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleRenderUpdateHotel = async (req, res, next) => {
  try {
    const idKategori = req.params.idKategori;
    let kategori = await KategoriModel.getKategoriById(idKategori);
    kategori = kategori[0]
    res.render('dashboard-kategori-ubah', {
      userData: true, titlePage: `Update Hotel | ${APP_NAME}`, kategori
    });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleUpdateKategori = async (req, res, next) => {
  try {
    const { namaKategori, id_kategori } = req.body

    // if (id_kategori && nama_wisata && google_map) {
    await KategoriModel.updateKategori({
      id: Number(id_kategori),
      namaKategori
    });
    // }
    res.redirect('/dashboard/kategori');
  } catch (err) {
    console.log('err')
    next(err)
  }
}
module.exports = {
  handleRenderDashboardKategori,
  handleAddKategori,
  handleDeleteKategori,
  handleRenderUpdateHotel,
  handleUpdateKategori
};