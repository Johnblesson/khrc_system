import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import session from 'express-session';
import passport from './server/passport/passport-config.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import connectDB from './server/database/connection.js';
import views from './server/routes/viewRoute.js';
import css_Storage from './server/routes/storages/css.js';
import ls1_Storage from './server/routes/storages/ls1.js';
import ls1_2_Storage from './server/routes/storages/ls2.js';
import ls2_Storage from './server/routes/storages/ls1-2.js';
import export_storage from './server/routes/xlsx.js';
import reception from './server/routes/reception.js';
import contact from './server/routes/contactRoute.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatePath = path.join(__dirname, './views');
app.set('view engine', 'ejs');
app.set('views', templatePath);

// Serve static files from the 'public' directory
app.use(express.static('public')) 

// Add express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }))

app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse "_method" query parameter
app.use(methodOverride('_method'));

// Disable X-Powered-By header
// app.disable('x-powered-by');

// Disable ETag header
// app.set('etag', false);

// Disable Server signature
// app.use((req, res, next) => {
//   res.removeHeader('Server');
//   next();
// });

// Add the router
app.use(views)
app.use(css_Storage)
app.use(ls1_Storage)
app.use(ls1_2_Storage)
app.use(ls2_Storage)
app.use(reception)
app.use(contact)
app.use(export_storage)

// Start the Server  
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})