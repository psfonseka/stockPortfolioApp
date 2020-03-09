const db = require("../db/connection");
const iexTokens = require("../env/IEXToken.json");
const axios = require("axios");
//Mode can be sandbox(testing unlimited) or cloud mode(production limited)
const mode = "sandbox";
const apiToken = (mode === "sandbox") ? iexTokens.API_Test : iexTokens.API_Token;
db.any("SELECT * FROM users")
  .then((result) => {
    console.log(result);
  })

module.exports = {
  signup: (req, res) => {
    console.log(req.body);
    const token = req.headers.token;
    const email = req.body.email;
    const full_name = req.body.full_name;
    db.any(`insert into users (email, full_name, token, balance) values ('${email}', '${full_name}', '${token}', 5000.00)`)
      .then((result) => {
        console.log(result);
        res.send({
          redirect: '/portfolio'
        });
      })
  },

  login: (req, res) => {
    console.log(req.headers);
    res.send({
      redirect: '/portfolio'
    });
  },

  getPortfolio: (req, res) => {
    res.send('hello - portfolio');
  },

  addStock: (req, res) => {
    axios.get(`https://${mode}.iexapis.com/stable/stock/${req.body.tracker}/quote?token=${apiToken}`)
      .then((result) => {
        console.log(result.data);
        res.send(result.data);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  },

  getTransactions: (req, res) => {
    res.send('hello - transactions');
  }
};