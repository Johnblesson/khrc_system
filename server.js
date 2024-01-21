import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectDB from './server/database/connection.js';
import views from './server/routes/viewRoute.js';
import storage from './server/routes/storage.js';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatePath = path.join(__dirname, './views');
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public')) 

// Add express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

// Add the router
app.use(views)
app.use(storage)
app.use(contact)

// Start the Server  
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
