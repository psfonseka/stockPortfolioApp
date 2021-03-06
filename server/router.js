const expressRouter = require('express').Router;
const controller = require('./controllers/controller');
const router = expressRouter();

const Auth = require('./middleware/auth');

//Connect controller methods to their corresponding routes
router.post('/signup', Auth.createAuthorization, controller.signup);

router.post('/login', controller.login);

router.post('/portfolio', Auth.verifyAuthorization, controller.tradeStock);

router.get('/portfolio', Auth.verifyAuthorization, controller.getPortfolio);

router.get('/transactions', Auth.verifyAuthorization, controller.getTransactions);

module.exports = router;
