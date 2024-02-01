import { Router } from "express";
const router = Router();
import { signUp, logIn } from "../controllers/auth.js";
import { homeRoute, update } from "../services/render.js";
import ensureAuthenticated from '../middleware/auth.js';

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

// router.get('/index', (req, res) => {
//     res.render('index');
// })

router.get('/index', homeRoute)
router.get('/update', update)

router.get('/css-storage', (req, res) => {  
    res.render('css');
})

router.get('/ls1-storage', (req, res) => {  
    res.render('ls1');
})
router.get('/ls2-storage', (req, res) => {  
    res.render('ls2');
})

router.get('/contact', (req, res) => {  
    res.render('contactUs');
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