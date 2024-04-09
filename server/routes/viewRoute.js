import { Router } from "express";
// import express from "express";
// const app = express();
const router = Router();
import { 
  getAllUsers, 
  getUserById, 
  signUp, 
  logIn, 
  getLoginPage,
  getSignupPage,
  creatorContoller,
  edit_user, 
  updateUser, 
  deleteUser, 
  changePassword, 
  viewChangePwdPage, 
  profile 
} from "../controllers/auth.js";

import { 
  renderCssForm, 
  renderLs1Form, 
  renderLs12Form, 
  renderLs2Form 
} from "../controllers/storageRender.js";

// import { homeRoute, update } from "../services/render.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isUser } from "../middleware/isUser.js";
import { ensureAuthenticated } from "../middleware/isAuth.js";
import { checkSudoMiddleware } from "../middleware/checkSudoMiddleware.js";
import { creatorMiddleware } from "../middleware/creator.js"
import { checkForIpAddress } from "../middleware/sudo.js";
// import upload from "../upload/upload.js";

// Routes for the user views
router.post('/register', ensureAuthenticated, isAdmin, checkSudoMiddleware, signUp);
router.post('/login', logIn);
router.get('/', getLoginPage);
router.get('/register', ensureAuthenticated, isAdmin, checkSudoMiddleware, getSignupPage)

// Routes for the user views #Read
router.get('/profile/:id', ensureAuthenticated, profile);

// Define your route for changing password
router.patch('/change-password/:id', ensureAuthenticated, changePassword);
router.get('/change-password/:id', ensureAuthenticated, viewChangePwdPage);

// Routes for the user views
router.get('/index-admin', ensureAuthenticated, isAdmin, (req, res) => {
  const user = req.isAuthenticated() ? req.user : null;
  res.render('index-admin', { user });
});


// Routes for the storage views
router.get('/css-storage', ensureAuthenticated, isAdmin, renderCssForm)
router.get('/ls1-storage', ensureAuthenticated, isAdmin, renderLs1Form)
router.get('/ls1-2-storage', ensureAuthenticated, isAdmin, renderLs12Form)
router.get('/ls2-storage', ensureAuthenticated, isAdmin, renderLs2Form)

// Routes for the user views #Update #Delete
router.get('/registration-edit/:id', ensureAuthenticated, isAdmin, edit_user)
router.patch('/registration-edit/:id', ensureAuthenticated, checkSudoMiddleware, updateUser);
router.delete('/delete-user/:id', ensureAuthenticated, checkSudoMiddleware, deleteUser);
router.get('/delete-user/:id', ensureAuthenticated, checkSudoMiddleware, deleteUser);

// Creator
router.get('/creator', creatorContoller)

// Reception views
router.get('/reception-form', ensureAuthenticated, isUser, (req, res) => { 
// The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;

// Render the page with the user information
  res.render('reception', { user });
})

router.get('/reception-admin-form', ensureAuthenticated, isAdmin, (req, res) => { 
    // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;

  // Render the page with the user information
  res.render('reception-admin', { user });
})

router.get('/admin-contact', ensureAuthenticated, (req, res) => {
  // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;  
    res.render('contact-admin', { user });
})

router.get('/user-contact', ensureAuthenticated, (req, res) => {  
  // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;  
    res.render('contact-user', { user });
})

// Message Success 
router.get('/admin-message-success', ensureAuthenticated, isAdmin, (req, res) => {
  res.render('message_success/admin')
})

// Message Success
router.get('/user-message-success', ensureAuthenticated, (req, res) => {
  res.render('message_success/user')
})

// About page
router.get('/about', ensureAuthenticated, (req, res) => {
    res.render('About');
})

// Forbidden page
router.get('/forbidden', (req, res) => {
    res.render('forbidden');
})

// Super admin only page error
router.get('/not-allow', (req, res) => {
  res.render('forbiddenAdmin');
})

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
});

// export the router
export default router;