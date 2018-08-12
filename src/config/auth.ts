/**
 * Expose our config directly to our application.
 */
export default {
  'facebookAuth': {
    'clientID': 'APP_ID',
    'clientSecret': 'APP_SECRET',
    'callbackURL': 'http://localhost:8080/auth/facebook/callback',
    'profileFields': ['id', 'displayName', 'email'],
  }
}
