import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from  '../models/auth.js'; // Adjust the path based on your project structure

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'User does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Invalid credentials.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
