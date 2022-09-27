const express = require('express')
const router = express.Router()
const AppController = require('../controller');
const AuthController = require('../controller/Auth');
const DashboardController = require('../controller/Dashboard');
const WisataController = require('../controller/Wisata');
const HotelController = require('../controller/Hotel');
const KategoriController = require('../controller/Kategori');
const BukuTamuController = require('../controller/BukuTamu');
const { forwardAuthenticated } = require('../config/auth');
const { asyncErrorHandler } = require('../midleware/index');
const { ensureAuthenticated } = require('../config/auth');
const multer = require('multer');
const { storage } = require('../cloudinary/index.cloudinary.js');
const upload = multer({
  storage,
  limits: {
    fileSize: 9010000 // 9.01mb 
  }
});

// render root view
// pasang middleware forwardAuthenticated agar user tidak login ulang ketika sudah memiliki session
router.get('/', AppController.getHomePage);
router.get('/kontak', AppController.getKontakPage);
router.get('/buku-tamu', BukuTamuController.handleRenderBukuTamuPage);
router.get('/wisata', WisataController.handleRenderListWisata);
router.get('/wisata/detail/:idWisata', WisataController.handleRenderDetailWisata);
router.get('/hotel', HotelController.handleRenderListHotel);
router.get('/hotel/detail/:idHotel', HotelController.handleRenderDetailHotel);
// render login view
// pasang middleware forwardAuthenticated agar user tidak login ulang ketika sudah memiliki session
// router.get('/login', forwardAuthenticated, AppController.renderLoginPage);
router.get('/login', forwardAuthenticated, AuthController.renderLoginAdminPage);
router.post('/login', AuthController.handleAdminLoginSubmit);

router.get('/dashboard', ensureAuthenticated, DashboardController.renderDashbordPage);
router.get('/dashboard/wisata', ensureAuthenticated, WisataController.handleRenderDashboardWisata);
router.post('/wisata/add', ensureAuthenticated, asyncErrorHandler(upload.array('images', 3)), WisataController.handleAddWisata);
router.get('/dashboard/hotel', ensureAuthenticated, HotelController.handleRenderDashboardHotel);
router.post('/hotel/add', ensureAuthenticated, asyncErrorHandler(upload.array('images', 3)), HotelController.handleAddHotel);
router.get('/dashboard/kategori', ensureAuthenticated, KategoriController.handleRenderDashboardKategori);
router.post('/kategori/add', ensureAuthenticated, KategoriController.handleAddKategori);
router.get('/dashboard/buku-tamu', ensureAuthenticated, BukuTamuController.handleRenderDashboardBukuTamu);
router.post('/buku-tamu/add', ensureAuthenticated, BukuTamuController.handleAddBukuTamu);
// handle user-logout 
// pasang midleware ensureAuthenticated agar user yang mengakses rute ini sudah memiliki session
// router.get('/logout', ensureAuthenticated, AppController.handleLogout);


// middleware error status code 404
router.use((req, res, next) => { res.status(404).render('404'); });

// middleware error status code 500 
router.use((err, req, res, next) => { console.log(err); console.log('Error Status Code 500, msg.err => ', err); res.status(500).render('500'); });

module.exports = router;