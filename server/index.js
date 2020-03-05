// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const firebaseConfig = require("./env/firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Express App
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./client/dist'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))