const { APP_NAME } = require("../config");
const KategoriModel = require("../models/Kategori");

const handleRenderDashboardKategori = async (req, res, next) => {
  try {
    const dataKategori = await KategoriModel.getAllKategori()
    res.render('dashboard-kategori', { userData: undefined, titlePage: `Dashboard Kategori | ${APP_NAME}`, dataKategori });
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
module.exports = {
  handleRenderDashboardKategori,
  handleAddKategori
};