import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import session from 'express-session';
import passport from './server/passport/passport-config.js';
import bodyParser from 'body-parser';
import connectDB from './server/database/connection.js';
import views from './server/routes/viewRoute.js';
import css_Storage from './server/routes/css.js';
import ls1_Storage from './server/routes/ls1.js';
import ls1_2_Storage from './server/routes/ls2.js';
import ls2_Storage from './server/routes/ls1-2.js';
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
// app.use(express.urlencoded({ extended: false }));
  app.use(cors());
// Middleware to allow CORS (for development purposes)
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

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

// Add the router
app.use(views)
app.use(css_Storage)
app.use(ls1_Storage)
app.use(ls1_2_Storage)
app.use(ls2_Storage)
app.use(reception)
app.use(contact)

// Start the Server  
const PORT = process.env.PORT || 8080
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})
