// Import User model
import User from "../models/auth.js";

// Middleware to check sudo privileges
export const checkSudoPrivileges = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming you have a way to get the user's ID from the request

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.redirect('forbidden');
    }

    if (user.sudo) {
      // Grant access to the user with sudo privileges
      return next();
    }

    // If the user does not have sudo privileges, deny access
    return res.status(403).json({ message: 'Permission Denied' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


  

  