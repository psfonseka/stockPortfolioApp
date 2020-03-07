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


// Import the router and use it
const router = require("./router");
app.use("/api",router);

/**
 * Fallback URL to enable client-side routing
 * API Routes must be above in order to not be overwritten by the fallback
 */

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))