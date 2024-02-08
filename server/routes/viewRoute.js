import { Router } from "express";
const router = Router();
import { getAllUsers, getUserById, signUp, logIn } from "../controllers/auth.js";
// import { homeRoute, update } from "../services/render.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isUser } from "../middleware/isUser.js";
import { ensureAuthenticated } from "../middleware/isAuth.js";
import { checkSudoPrivileges } from "../middleware/sudo.js"

router.post('/register', signUp);
router.post('/login', logIn);
// router.get('/logout', logOut);

// Ejs routes
router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', checkSudoPrivileges, (req, res) => {
    res.render('sign up'); 
})

router.get('/index-admin', ensureAuthenticated, (req, res) => {
    const user = req.isAuthenticated() ? req.username : null;
    res.render('index-admin', { user });
})

router.get('/css-storage', ensureAuthenticated, (req, res) => {  
  const user = req.isAuthenticated() ? req.user : null;
  res.render('css', { user });
})

router.get('/ls1-storage', ensureAuthenticated, (req, res) => {  
  const user = req.isAuthenticated() ? req.user : null;
  res.render('ls1', { user });
})

router.get('/ls1-2-storage', ensureAuthenticated, (req, res) => {  
  const user = req.isAuthenticated() ? req.user : null;
  res.render('ls1-2', { user });
})

router.get('/ls2-storage', ensureAuthenticated, (req, res) => {  
  const user = req.isAuthenticated() ? req.user : null;
  res.render('ls2', { user });
})

// Storage
// router.get('/view/css', ensureAuthenticated, (req, res) => {
//     res.render('view-css');
// })

// router.get('/view/ls1', ensureAuthenticated, (req, res) => {
//     res.render('view-ls1');
// })
// router.get('/view/ls2', ensureAuthenticated, (req, res) => {
//     res.render('view-ls2');
// })

// View Storages

router.get('/reception-form', ensureAuthenticated, (req, res) => { 
// The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;

// Render the page with the user information
  res.render('reception', { user });
})

router.get('/reception-admin-form', ensureAuthenticated, (req, res) => { 
    // The user information should be available in req.user if authenticated
  const user = req.isAuthenticated() ? req.user : null;

  // Render the page with the user information
  res.render('reception-admin', { user });
})

router.get('/admin-contact', ensureAuthenticated, (req, res) => {  
    res.render('contactUs');
})

router.get('/user-contact', ensureAuthenticated, (req, res) => {  
    res.render('userContact');
})

router.get('/about', ensureAuthenticated, (req, res) => {
    res.render('About');
})

router.get('/forbidden', (req, res) => {
    res.render('forbidden');
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
});

// export the router
export default router;