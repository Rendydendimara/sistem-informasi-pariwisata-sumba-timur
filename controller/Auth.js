const { APP_NAME } = require("../config");
const passport = require('passport');

const renderLoginAdminPage = (req, res, next) => {
  try {
    res.render('login', { userData: undefined, titlePage: `Login | ${APP_NAME}` });
  } catch (err) {
    console.log('err')
    next(err)
  }
}

const handleAdminLoginSubmit = async (req, res, next) => {
  try {
    passport.authenticate('local', { failureRedirect: '/login' }),
      function (req, res) {
        res.redirect('/');
      };
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  } catch (err) {
    console.log('err')
    next(err)
  }
}

async function handleAdminLogout(req, res, next) {
  try {
    req.logout(function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });

  } catch (err) {
    console.log('err')
    next(err)
  }
}

module.exports = {
  renderLoginAdminPage,
  handleAdminLogout,
  handleAdminLoginSubmit,
};