module.exports = {
  signup: (req, res) => {
    console.log(req.headers);
    res.send({
      redirect: '/portfolio'
    });
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