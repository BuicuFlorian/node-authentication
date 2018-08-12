import { usersController } from './../controllers/usersController';
import * as Facebook from 'passport-facebook';
import { IUserDocument } from '../models/user';
import configAuth from './auth';
import IUser from '../types/IUser';

export default (passport) => {
  /**
   * Used to serialize the user for the session.
   */
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  /**
   * Used to deserialize the user.
   */
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersController.getUserById(id);

      if (user) {
        return done(null, user);
      }
    } catch (error) {
      return done(error, null)
    }
  });

  passport.use(new Facebook.Strategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields,
  },

    /**
     * Facebook will send back the token and profile.
     */
    async (token: string, refreshToken: string, profile, done) => {
      try {
        // Find the user in the database based on his facebook id.
        const user: IUserDocument = await usersController.getUserByFacebookId(profile.id);

        // If the user is found, then log him in.
        if (user) {
          return done(null, user);
        } else {
          // If there is no user found with that facebook id, then create a new one.
          const newUser: IUser = {
            // Set all of the facebook information in our user model.
            facebook: {
              id: profile.id,
              token: token,
              name: profile.displayName,
              email: profile.emails[0].value,
            },
          };

          let account = await usersController.createAccount(newUser);

          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
}
