const BukuTamuModel = require("../models/BukuTamu");

const handleAddBukuTamu = async (req, res, next) => {
  try {
    const { email, tanggapan } = req.body
    if (email && tanggapan) {
      await BukuTamuModel.addBukuTamu({
        email, tanggapan
      });
    }
    res.redirect('/');
  } catch (err) {
    console.log('err')
    next(err)
  }
}


module.exports = {
  handleAddBukuTamu
};