import { Router } from "express";
import express from "express";
const app = express();
const router = Router();
import { getAllUsers, getUserById, signUp, logIn, getLoginPage, edit_user, updateUser, deleteUser, changePassword, viewChangePwdPage } from "../controllers/auth.js";
import { renderCssForm, renderLs1Form, renderLs12Form, renderLs2Form } from "../controllers/storageRender.js";
// import { homeRoute, update } from "../services/render.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isUser } from "../middleware/isUser.js";
import { ensureAuthenticated } from "../middleware/isAuth.js";
import { checkIpAccess } from "../middleware/checkip.js";
import { superAdminOnly } from "../middleware/sudo.js";

// Routes for the user views
router.post('/register', superAdminOnly, checkIpAccess, signUp);
router.post('/login', logIn);
router.get('/', checkIpAccess, getLoginPage);
router.get('/register', superAdminOnly, checkIpAccess, (req, res) => {
    res.render('sign up'); 
})

// Define your route for changing password
router.patch('/change-password/:id', ensureAuthenticated, checkIpAccess, changePassword);
router.get('/change-password/:id', ensureAuthenticated, checkIpAccess, viewChangePwdPage);

// Routes for the user views
router.get('/index-admin', ensureAuthenticated, isAdmin, checkIpAccess, (req, res) => {
  const user = req.isAuthenticated() ? req.user : null;
  res.render('index-admin', { user });
});


// Routes for the storage views
router.get('/css-storage', ensureAuthenticated, isAdmin, checkIpAccess, renderCssForm)
router.get('/ls1-storage', ensureAuthenticated, isAdmin, checkIpAccess, renderLs1Form)
router.get('/ls1-2-storage', ensureAuthenticated, isAdmin, checkIpAccess, renderLs12Form)
router.get('/ls2-storage', ensureAuthenticated, isAdmin, checkIpAccess, renderLs2Form)

// Routes for the user views #Update #Delete
router.get('/registration-edit/:id', ensureAuthenticated, isAdmin, checkIpAccess, superAdminOnly, edit_user)
router.patch('/registration-edit/:id', superAdminOnly, ensureAuthenticated, checkIpAccess, updateUser);
router.delete('/delete-user/:id', ensureAuthenticated, superAdminOnly, checkIpAccess, deleteUser);
router.get('/delete-user/:id', ensureAuthenticated, superAdminOnly, checkIpAccess, deleteUser);

// Reception views
router.get('/reception-form', ensureAuthenticated, isUser, checkIpAccess, (req, res) => { 
// The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;

// Render the page with the user information
  res.render('reception', { user });
})

router.get('/reception-admin-form', ensureAuthenticated, isAdmin, checkIpAccess, (req, res) => { 
    // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;

  // Render the page with the user information
  res.render('reception-admin', { user });
})

router.get('/admin-contact', ensureAuthenticated, checkIpAccess, (req, res) => {
  // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;  
    res.render('contact-admin', { user });
})

router.get('/user-contact', ensureAuthenticated, checkIpAccess, (req, res) => {  
  // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;  
    res.render('contact-user', { user });
})

// Message Success 
router.get('/admin-message-success', ensureAuthenticated, isAdmin, checkIpAccess, (req, res) => {
  res.render('message_success/admin')
})

// Message Success
router.get('/user-message-success', ensureAuthenticated, checkIpAccess, (req, res) => {
  res.render('message_success/user')
})

// About page
router.get('/about', ensureAuthenticated, checkIpAccess, (req, res) => {
    res.render('About');
})

// Forbidden page
router.get('/forbidden', checkIpAccess, (req, res) => {
    res.render('forbidden');
})

// Logout route
router.get('/logout', checkIpAccess, (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
});

// export the router
export default router;