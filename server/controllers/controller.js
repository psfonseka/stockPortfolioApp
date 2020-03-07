const db = require("../db/connection");
const iexToken = require("../env/IEXToken.json").API_Token;
const axios = require("axios");
//Mode can be sandbox or cloud mode - using sandbox to avoid key limit usage
const mode = "sandbox";
console.log(iexToken);
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
    axios.get(`https://${mode}.iexapis.com/stable/stock/${req.body.tracker}/quote?token=Tpk_04eb566627814878b05e8989c247f362`)
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