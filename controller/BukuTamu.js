const BukuTamuModel = require("../models/BukuTamu");
const { APP_NAME } = require("../config");

const handleRenderDashboardBukuTamu = async (req, res, next) => {
  try {
    const dataBukuTamu = await BukuTamuModel.getAllBukuTamu()
    res.render('dashboard-buku-tamu', { userData: undefined, titlePage: `Dashboard Buku Tamu | ${APP_NAME}`, dataBukuTamu });
    return
  } catch (err) {
    next(err)
  }
}

const handleAddBukuTamu = async (req, res, next) => {
  try {
    const { email, tanggapan } = req.body
    await BukuTamuModel.addBukuTamu({
      email, tanggapan
    });
    res.redirect('/dashboard/buku-tamu');
  } catch (err) {
    console.log('err')
    next(err)
  }
}


module.exports = {
  handleRenderDashboardBukuTamu,
  handleAddBukuTamu
};