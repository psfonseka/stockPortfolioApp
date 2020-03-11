const db = require("../db/connection");
const iexTokens = require("../env/IEXToken.json");
const axios = require("axios");
//Mode can be sandbox(testing unlimited) or cloud mode(production limited)
const mode = "cloud";
const apiToken = (mode === "sandbox") ? iexTokens.API_Test : iexTokens.API_Token;

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
        return db.any(`select id, quantity, tracker from stocks where stocks.user_id = ${user_id}`)
      })
      .then((result) => {
        info.stocks = result;
        let stocks = result.map((stock) => {
          return axios.get(`https://${mode}.iexapis.com/stable/stock/${stock.tracker}/quote?token=${apiToken}`)
        })
        return Promise.all(stocks);
      })
      .then((stockInfo) => {
        info.portfolioValue = 0;
        for (let i = 0; i < stockInfo.length; i++) {
          info.stocks[i].currentPrice = stockInfo[i].data.iexRealtimePrice || stockInfo[i].data.latestPrice;
          info.stocks[i].openPrice = stockInfo[i].data.previousClose; // Using previous close because open prices are broken on the IEX API
          info.stocks[i].totalValue = (info.stocks[i].currentPrice*info.stocks[i].quantity).toFixed(2);
          info.portfolioValue += Number(info.stocks[i].totalValue);
        }
        info.portfolioValue = Number(info.portfolioValue.toFixed(2));
        res.send(info);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  },

  tradeStock: (req, res) => {
    const user_id = req.headers.user_id;
    let quantity = parseInt(req.body.quantity);
    let tracker = req.body.tracker.toUpperCase();
    let decision = req.body.decision;
    db.any(`select balance from users where id = ${user_id}`)
      .then((result) => {
        let balance = result[0].balance;
        axios.get(`https://${mode}.iexapis.com/stable/stock/${tracker}/quote?token=${apiToken}`)
          .then((result) => {
            let data = result.data;
            let price = data.iexRealtimePrice || data.latestPrice;
            let cost = Number((price*quantity).toFixed(2));
            if (decision === "buy") {
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
            }
            else if (decision === "sell") {
              let stockID = -1;
              db.any(`select id, quantity from stocks where user_id = ${user_id} and tracker = '${tracker}'`)
                .then((query) => {
                  if (query[0].quantity < quantity) throw "The selling quantity is less than owned quantity"
                  else {
                    stockID = query[0].id;
                    let newQuantity = query[0].quantity - quantity;
                    return db.any(`update stocks set quantity = ${newQuantity} where id = ${stockID}`)
                  }
                })
                .then(() => {
                  return db.any(`update users set balance = balance + ${cost} where id = ${user_id}`)
                })
                .then(() => {
                  return db.any(`insert into transactions (stock_id, trade, quantity, price) values (${stockID}, 'sell', ${quantity}, ${price})`)
                })
                .then(() => {
                  res.send(data);
                })
                .catch((error) => {
                  console.log(error);
                  res.send({alert: `${error}`});
                })
            } else throw "Something went wrong! Not Buy or Sell";
          })
          .catch((error) => {
            console.log(error);
            res.send({alert: `${error}`});
          })
      })
      .catch((error) => {
        console.log(error);
        res.send({alert: `${error}`});
      })
  },

  getTransactions: (req, res) => {
    const user_id = req.headers.user_id;
    db.any(`select transactions.id, transactions.quantity, price, trade, tracker from transactions left outer join stocks on transactions.stock_id = stocks.id where stocks.user_id = ${user_id}`)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  }
};