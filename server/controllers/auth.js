import express from 'express';
const app = express();
import User from '../models/auth.js';
import { body, validationResult } from 'express-validator';
// import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from '../passport/passport-config.js';
// import dotenv from 'dotenv';

 // Sign Up Controller
 export const signUp = async (req, res) => {
    // Validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a session
    req.session.user = {
      // Other user information
      isSignedUp: true,
      isLogin: true,
    };
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
      const userData = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
        status: req.body.status,
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
export const logIn = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).json({ msg: info.message });
      }

      // Check if user status is active
      if (user.status === 'active') {
        // User is active, proceed with login
        req.login(user, async (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }

          // Create a JWT token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24hrs' });
          delete user.password;
          req.session.user = user;
          console.log(token);
          res.cookie('token', token, { httpOnly: true });

          // Check the role and render different views
          if (user.role === 'admin') {
            res.redirect('/admin-home');
          } else if (user.role === 'user') {
            res.redirect('/home');
          } else {
            res.redirect('/home');
          }
        });
      } else {
        // User status is inactive, send forbidden response
        res.status(403).json({ msg: 'Forbidden: User status is inactive.' });
      }
    } catch (catchErr) {
      res.status(500).json({ error: catchErr.message });
    }
  })(req, res, next);
};

// Get Login Page Controller
export const getLoginPage = (req, res) => {
  const ip =
    req.headers['cf-conneting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress || '';

  const timestamp = new Date().toISOString();
  console.log('ip address:', ip, '/', timestamp);
  res.render('login');
};



// Get All Users Controller
export const getAllUsers = async (req, res) => {

  const locals = {
    title: "KHRC",
    description: "Kambia Health Research Center KHRC System",
  };

  try {
    // Fetch all users from the database
    const users = await User.find({}, '-password'); // Exclude password field from the response

    res.render('all-users', { data: users, locals });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching users.');
  }
};

// Get One User by ID Controller
export const getUserById = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Fetch the user from the database by ID, excluding the password field
    const user = await User.findById(userId, '-password');

    if (!user) {
      // If user not found, return a 404 response
      return res.status(404).json({ error: 'User not found' });
    }

    // If user found, send the user information in the response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user by ID.' });
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
