import User from '../models/auth.js';
import { body, validationResult } from 'express-validator';
// import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

 // Sign Up Controller
 export const signUp = async (req, res) => {
    // Validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a session
    // req.session.user = {
    //   // Other user information
    //   isSignedUp: true,
    //   isLogin: true,
    // };
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
      const userData = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      });
  
      // Check for duplicate usernames
      const existingUser = await User.findOne({ username: userData.username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
  
      // Ensure the password contains at least one uppercase letter, one lowercase letter, and is at least 6 characters long
      if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(req.body.password)) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters long and contain both uppercase and lowercase letters.',
        });
      }
  
      const savesData = await userData.save();
      res.redirect('/');
      console.log(savesData);
      // res.status(201).json({ message: 'Signed up successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while signing up.');
    }
  };


// Login Controller
export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1200s' });
    delete user.password;
    res.render('index');
    // res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Logout Controller
export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect('/');
      });
}
