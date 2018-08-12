import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

/**
 * Route for Facebook authentication and login.
 */
router.get('/auth/facebook', passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['public_profile', 'email', 'user_friends']
}));

/**
 * Handle the callback after Facebook has authenticated the user.
 */
router.get('/auth/facebook/callback',
  passport.authenticate('facebook',
  {
    successRedirect: '/home',
    failureRedirect: '/'
  })
);


/**
 * Route for logout.
 */
router.get('/logout',
  (req: express.Request, res: express.Response): void => {
    (req as any).logout();
    res.redirect('/login');
  });

/**
 * Exporting the router object.
 */
export default router;
