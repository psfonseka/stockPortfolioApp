// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const firebaseConfig = require("./env/firebase");

// Add the Firebase products that you want to use
require("firebase/auth");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Import Authorization Middleware
const Auth = require('./middleware/auth');

// Initialize Express App
const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

// Enable CORS for communication between client and server
app.use(cors())

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve React App
app.use(express.static('./client/dist'))

// app.get('/portfolio', (req, res) => {
//   console.log(req.headers);
//   res.send("confirm");
// })

app.post('/login', (req, res) => {
  console.log(req.headers);
  res.send({
    redirect: '/portfolio'
  });
})

app.post('/signup', (req, res) => {
  console.log(req.headers);
  res.send({
    redirect: '/portfolio'
  });
})

app.get('/api/portfolio', Auth.verifyAuthorization, (req, res) => {
  res.send('hello');
})

app.get('/auth/signup', (req, res) => {
  firebase.auth().createUserWithEmailAndPassword("john@gmail.com", "doedoedoe")
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    res.send(error.message);
  });
})

// app.get('/auth/signin', (req, res) => {
//   firebase.auth().signInWithEmailAndPassword("john@gmail.com", "doedoedoe")
//     .then(user => {
//       console.log(user);
//       res.send(user);
//     })
//     .catch(error => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(error);
//     res.send(error.message);
//   });
// })

app.get('/auth/token', (req, res) => {
  if (firebase.auth().currentUser) {
    firebase.auth().currentUser.getIdToken(true)
    .then((idToken) => {
      res.send(idToken);
    }).catch((error) => {
      res.send(error.message);
    })
  } else {
    res.send("No current User");
  }
})


/**
 * Fallback URL to enable client-side routing
 * API Routes must be above in order to not be overwritten by the fallback
 */

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))