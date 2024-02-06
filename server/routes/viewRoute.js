import { Router } from "express";
const router = Router();
import { getAllUsers, getUserById, signUp, logIn } from "../controllers/auth.js";
// import { homeRoute, update } from "../services/render.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isUser } from "../middleware/isUser.js";
import { ensureAuthenticated } from "../middleware/isAuth.js";

router.post('/register', signUp);
router.post('/login', logIn);
// router.get('/logout', logOut);

// Ejs routes
router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('sign up'); 
})

router.get('/api/users', getAllUsers)
router.get('/api/users/:id', getUserById)

// router.get('/index', (req, res) => {
//     res.render('index');
// })

// router.get('/index', ensureAuthenticated, homeRoute)
// router.get('/update', update)

// router.get('/index', ensureAuthenticated, async(req, res) => {
//     const messages = await req.flash("info");

//     // const locals = {
//     //   title: "NodeJs",
//     //   description: "Free NodeJs User Management System",
//     // };

//     res.render('index', messages);
// })

router.get('/index-admin', ensureAuthenticated, (req, res) => {
    res.render('index-admin');
})

router.get('/css-storage', ensureAuthenticated, (req, res) => {  
    res.render('css');
})

router.get('/ls1-storage', ensureAuthenticated, (req, res) => {  
    res.render('ls1');
})
router.get('/ls2-storage', ensureAuthenticated, (req, res) => {  
    res.render('ls2');
})

router.get('/reception-form', ensureAuthenticated, (req, res) => { 
    res.render('reception');
})

router.get('/reception-admin-form', ensureAuthenticated, (req, res) => { 
    res.render('reception-admin');
})

router.get('/admin-contact', ensureAuthenticated, (req, res) => {  
    res.render('contactUs');
})

router.get('/user-contact', ensureAuthenticated, (req, res) => {  
    res.render('userContact');
})

// View reception
// router.get('/view-reception', (req, res) => {
//     res.render('viewReception');
// })

// router.get('/admin/view-reception', (req, res) => {
//     res.render('adminViewReception');
// })

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