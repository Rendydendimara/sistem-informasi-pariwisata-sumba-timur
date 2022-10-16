const { APP_NAME } = require("../config");

module.exports = {
  //fungsi untuk merender home page
  async renderDashbordPage(req, res, next) {
    try {
      res.render('dashboard', { userData: true, titlePage: `Dashboard | ${APP_NAME}` });
      return
    } catch (err) {
      next(err)
    }
  },
}
