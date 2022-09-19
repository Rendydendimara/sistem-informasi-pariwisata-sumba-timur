const express = require('express')
const router = express.Router()
const appController = require('../controller');
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');

// render root view
// pasang middleware forwardAuthenticated agar user tidak login ulang ketika sudah memiliki session
router.get('/', appController.getHomePage);

// render login view
// pasang middleware forwardAuthenticated agar user tidak login ulang ketika sudah memiliki session
// router.get('/login', forwardAuthenticated, appController.renderLoginPage);

// router.get('/dashboard', ensureAuthenticated, appController.handleDashboardAdmin);
// handle user-logout 
// pasang midleware ensureAuthenticated agar user yang mengakses rute ini sudah memiliki session
// router.get('/logout', ensureAuthenticated, appController.handleLogout);


// middleware error status code 404
router.use((req, res, next) => { res.status(404).render('404'); });

// middleware error status code 500 
router.use((err, req, res, next) => { console.log(err); console.log('Error Status Code 500, msg.err => ', err); res.status(500).render('500'); });

module.exports = router;