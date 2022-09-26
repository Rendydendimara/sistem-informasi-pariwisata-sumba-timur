const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();
const flash = require('connect-flash');

// Cors enable
app.use(cors());

// DB config
const db = require('./config/db-config');
const { createTableBukuTamu, } = require('./models/BukuTamu');
const { createTableAdmin } = require('./models/Admin');
const { createTableWisata } = require('./models/Wisata');
const { createTableKategori } = require('./models/Kategori');
const { createTableHotel } = require('./models/Hotel');
// Passport config
require('./config/passport')(passport);

// Cookie parser
app.use(cookieParser());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS  Template Engine
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(session({
  secret: 'session_secret_si',
  name: 'si_pariwisata_sumba_timur',
  resave: true,
  saveUninitialized: true
}));

// Passport midleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Logger
app.use(morgan(function (tokens, req, res) {
  const responseCode = tokens?.status(req, res) ?? "500"
  if (responseCode.charAt(0) === "4" || responseCode.charAt(0) === "5") {
    if (req.body.files) {
      req.body.files = undefined; // except files
    }
    console.log('request.body', req.body)
    console.log('request.query', req.query)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      responseCode,
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}));

db.getConnection(async (err, result) => {
  if (err) {
    // Routes
    app.use(require('./routes'));
    console.log('Database tidak terkoneksi, aplikasi tidak dapat menggunakan database');
    console.log('err', err)
  } else {
    // Routes
    app.use(require('./routes'));
    console.log('Database terkoneksi, aplikasi dapat menggunakan');
    // Routes
    // try {
    createTableBukuTamu()
    createTableAdmin()
    createTableWisata()
    createTableKategori()
    createTableHotel()
    //   addBukuTamu('rendy@gmail.com', 'mantap')
    //   const data = await getAllBukuTamu()
    //   console.log('data', data)
    // } catch (err) {
    //   console.log('error', err)
    // }
  }
});

const PORT = process.env.PORT || 8000;

// Listen 
app.listen(PORT, () => console.log(`server running on port ${PORT}`));