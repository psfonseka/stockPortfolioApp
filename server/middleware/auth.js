// Allow DB access for finding the proper user id on verification
const db = require("../db/connection");

// Initialize Firebase Admin
const admin = require('firebase-admin')
const serviceAccount = require("../env/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stock-portfolio-app-379b1.firebaseio.com"
});


//Middleware for Authorization, confirming that there is a user with the given access token
module.exports.verifyAuthorization = (req, res, next) => {
  if (req.headers.authorization) {
    admin.auth().verifyIdToken(req.headers.authorization)
      .then((result) => {
        // Get the proper id of the user for later queries
        return db.any(`SELECT id FROM users where token = '${result.user_id}'`); 
      })
      .then((id) => {
        req.headers.user_id = id[0].id;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.send({
          redirect: '/login'
        });
      });
  } else {
    res.send({
      redirect: '/login'
    });
  }
};

module.exports.createAuthorization = (req, res, next) => {
  if (req.headers.authorization) {
    admin.auth().verifyIdToken(req.headers.authorization)
      .then((result) => {
        console.log("verified:", result.user_id);
        req.headers.token = result.user_id;
        next()
      }).catch(() => {
        res.send({
          redirect: '/login'
        });
      });
  } else {
    res.send({
      redirect: '/login'
    });
  }
};