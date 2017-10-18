const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')

// import individual AWS service
const AWS = require('aws-sdk');
const ReactS3Uploader = require('react-s3-uploader');


module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  console.log('token', token, 'profile', profile)

  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  // Add the Google access token to the Cognito credentials login map.
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.IDENTITY_POOL_ID,
    Logins: {
       'accounts.google.com': token
    }
 });

 const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: process.env.BUCKET_NAME}
  });
  User.find({where: {googleId}})
    .then(user => user
      ? done(null, user)
      : User.create({name, email, googleId})
        .then(user => done(null, user))
    )
    .catch(done)
})

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: 'email https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me'}))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))
