const BukuTamuModel = require("../models/BukuTamu");
const AdminModel = require("../models/Admin");
const { APP_NAME } = require("../config");

const handleRenderBukuTamuPage = async (req, res, next) => {
  try {
    const adminId = req.session.passport?.user ?? 0;
    const userData = await AdminModel.getAdminById(adminId);
    res.render('buku-tamu', { userData: userData ?? undefined, titlePage: `Buku Tamu | ${APP_NAME}` });
    return
  } catch (err) {
    next(err)
  }
}

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
    res.redirect('/buku-tamu');
  } catch (err) {
    console.log('err')
    next(err)
  }
}


module.exports = {
  handleRenderBukuTamuPage,
  handleRenderDashboardBukuTamu,
  handleAddBukuTamu
};