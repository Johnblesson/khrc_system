// Middleware to check if a user is logged in
// export const isAuthenticated = (req, res, next) => {
//     if (req.session.user) {
//       next();
//     } else {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   }

export const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
      // User is authenticated, allow them to proceed
      next();
    } else {
      // User is not authenticated, redirect them to the login page
      res.redirect('/forbidden');
    }
  }
