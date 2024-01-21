// Import necessary modules
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

// Define the initialize function
function initialize(passport, getUserByEmail, getUserByUsername, getUserById) {
  // Local strategy for email authentication
  passport.use(
    'local-email',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (e) {
        return done(e);
      }
    })
  );

  // Local strategy for username authentication
  passport.use(
    'local-username',
    new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
      const user = getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'No user with that username' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (e) {
        return done(e);
      }
    })
  );

  // Serialize and deserialize user functions (assuming you have these implemented)
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

// Export the initialize function
export default initialize;
