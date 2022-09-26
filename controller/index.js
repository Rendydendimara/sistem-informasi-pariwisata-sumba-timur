const { APP_NAME } = require("../config");
const AdminModel = require("../models/Admin");


module.exports = {
  //fungsi untuk merender home page
  async getHomePage(req, res, next) {
    try {
      const adminId = req.session.passport?.user ?? 0;
      const userData = await AdminModel.getAdminById(adminId);
      res.render('index', { userData: userData ?? undefined, titlePage: "Sistem Informasi Pariwisata Sumba Timur" });
      return
    } catch (err) {
      next(err)
    }
  },
}
