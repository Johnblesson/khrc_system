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
        createdAt: new Date(), // Assuming createdAt and updatedAt are Date objects
        updatedAt: new Date()
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

// Change Password Controller
export const changePassword = async (req, res) => {
  try {
    const { userId, username, email, oldPassword, newPassword } = req.body;

    let user;

    // Check if userId is provided
    if (userId) {
      // Find the user by userId
      user = await User.findById(userId);
    } else {
      // If userId is not provided, check by username or email
      user = await User.findOne({ $or: [{ username }, { email }] });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the old password matches the user's current password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    // Validate the new password format
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(newPassword)) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long and contain both uppercase and lowercase letters.',
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // res.status(200).json({ message: 'Password changed successfully' });
    res.render('update-success/password');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while changing password.');
  }
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

// View Edit user GET REQUEST
export const edit_user = async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id });

    const user = req.isAuthenticated() ? req.user : null;

    const locals = {
      title: "KHRC",
      description: "Kambia Health Research Center KHRC System",
    };

    res.render("editRegistration", {
      locals,
      users,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    // Extract the User ID from the request parameters
    const { id } = req.params;

    // Find the User record by ID and update its fields
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    // Check if the User record exists
    if (!updatedUser) {
      return res.status(404).json({ message: 'User record not found' });
    }

    // Respond with the updated User record
    // res.status(200).json(updatedStorage);
    res.render('update-success/users');
  } catch (error) {
    console.error('Error updating User record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user data
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.render("success-delete/users");
  } catch (error) {
    console.log(error);
  }
};

// View Edit user GET REQUEST
export const viewChangePwdPage = async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id });

    const user = req.isAuthenticated() ? req.user : null;

    const locals = {
      title: "KHRC",
      description: "Kambia Health Research Center KHRC System",
    };

    res.render("change-password", {
      locals,
      users,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// View user's profile GET REQUEST
export const profile = async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id });

    const locals = {
      title: "KHRC",
       description: "Kambia Health Research Center KHRC System",
    };

    res.render("profile", {
      locals,
      users,
    });
  } catch (error) {
    console.log(error);
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
