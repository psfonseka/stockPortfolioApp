const db = require("../db/connection");
db.any("SELECT * FROM users")
  .then((result) => {
    console.log(result);
  })

module.exports = {
  signup: (req, res) => {
    console.log(req.body);
    const token = req.headers.user_id;
    const email = req.body.email;
    const full_name = req.body.full_name;
    db.any(`insert into users (email, full_name, user_id, balance) values ('${email}', '${full_name}', '${token}', 5000.00)`)
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

  getTransactions: (req, res) => {
    res.send('hello - transactions');
  }
};