const db = require("../db/connection");
const iexTokens = require("../env/IEXToken.json");
const axios = require("axios");
//Mode can be sandbox(testing unlimited) or cloud mode(production limited)
const mode = "sandbox";
const apiToken = (mode === "sandbox") ? iexTokens.API_Test : iexTokens.API_Token;
// db.any("SELECT * FROM users")
//   .then((result) => {
//     console.log(result);
//   })

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
    console.log(req.headers);
    const user_id = req.headers.user_id;
    console.log(user_id);
    let info = {};
    db.any(`select balance from users where id = ${user_id}`)
      .then((result) => {
        info.balance = result[0].balance;
        res.send(info);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  },

  addStock: (req, res) => {
    const user_id = req.headers.user_id;
    let quantity = parseInt(req.body.quantity);
    let tracker = req.body.tracker;
    db.any(`select balance from users where id = ${user_id}`)
      .then((result) => {
        let balance = result[0].balance;
        axios.get(`https://${mode}.iexapis.com/stable/stock/${tracker}/quote?token=${apiToken}`)
          .then((result) => {
            let data = result.data;
            let price = data.iexRealtimePrice || data.latestPrice;
            let cost = Number((price*quantity).toFixed(2));
            console.log(cost);
            // Check to see if the user can actually make the purchase depending on whether their balance is greater than the total cost
            if (cost > balance) {
              res.send({alert: `Not enough cash for purchase: $${cost.toFixed(2)}`});
            } else {
              db.any(`update users set balance = balance - ${cost} where id = ${user_id}`)
                .then(() => {
                  // Check if user already owns the stock
                db.any(`select id, quantity from stocks where user_id = ${user_id} and tracker = '${tracker}'`)
                  .then((query) => {
                    console.log(query);
                    // If the user does not own the stock, add the stock to the database, then find the stockID and add to transactions
                    if (query.length === 0) {
                      db.any(`insert into stocks (user_id, quantity, tracker) values (${user_id}, ${quantity},'${tracker}') returning id`)
                        .then((idobj) => {
                          let stockID = idobj[0].id;
                          return db.any(`insert into transactions (stock_id, trade, quantity, price) values (${stockID}, 'buy', ${quantity}, ${price})`)
                        })
                        .then(() => {
                          res.send(data);
                        })
                        .catch((error) => {
                          console.log(error);
                          res.send(error);
                        })
                    } else {
                      let stockID = query[0].id;
                      let newQuantity = query[0].quantity + quantity;
                      db.any(`update stocks set quantity = ${newQuantity} where id = ${stockID}`)
                        .then(() => {
                          return db.any(`insert into transactions (stock_id, trade, quantity, price) values (${stockID}, 'buy', ${quantity}, ${price})`)
                        })
                        .then(() => {
                          res.send(data);
                        })
                        .catch((error) => {
                          console.log(error);
                          res.send(error);
                        })
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    res.send(error);
                  })
              })
              .catch((error) => {
                console.log(error);
                res.send(error);
              })
            }   
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          })
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