// Initialize Firebase Admin
const admin = require('firebase-admin')
const serviceAccount = require("../env/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stock-portfolio-app-379b1.firebaseio.com"
});


//Middleware for Authorization, confirming that there is a user with the given access token
module.exports.verifyAuthorization = (req, res, next) => {
  console.log("from verification:", req.headers);
  if (req.headers.authorization) {
    admin.auth().verifyIdToken(req.headers.authorization)
      .then((result) => {
        next()
      }).catch(() => {
        res.send({
          redirect: '/login'
        });
        //res.status(403).send('Unauthorized')
      });
  } else {
    res.send({
      redirect: '/login'
    });
    //res.status(403).send('Unauthorized')
  }
};