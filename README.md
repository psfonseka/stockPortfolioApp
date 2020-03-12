# Stock Portfolio App

An application that simulates a stock portfolio with user authentication.
Currently Deployed at:
ec2-3-17-185-88.us-east-2.compute.amazonaws.com

## Deployed Existing Accounts (You can make your own too!):

### John Doe

E-mail: john_doe@gmail.com
Password: student0

### Bob Dylan
E-mail: bob_dylan@gmail.com
Password: student1

## User Stories:

### As a user, I want to create a new account with my name, email, and password so that I can buy and trade stocks.

- [x] Default the user's cash account balance to $5000.00 USD.
- [x] A user can only register once with any given email.

### As a user, I want to authenticate via email and passwords so that I can access my account.

- [x] E-mail/password authentication implemented.

Originally, I considered using my own personal authentication that I have used for practice projects, where I had done the salt creation and hashing on the server side. However, I am doubtful about the security of it, so I decided to use a third party service for authentication, and went ahead with firebase due to it's support of e-mail/password authentication and use of JWTs. Also, might have considered passport.js.

### As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the number of shares so that I can invest.

- [x] A user can only buy whole number quantities of shares.
- [x] A user can only buy shares if they have enough cash in their account for a given purchase.
- [x] A user can only buy shares if the ticker symbol is valid.

Whole number can be checked on the front-end but the the other two have to be checked on the backend after the API request.

### As a user, I want to view a list of all transactions I've made to date (trades) so that I can perform an audit.

- [x] Transactions page implemented.

Implemented by finding all stocks the user has previously owned then using a join to find all transactions with those given stock_ids.

### As a user, I want to view my portfolio (a list of stocks I own along with their current values) so that I can review performance.

- [x] Portfolio page implemented.

### As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so that I can review performance.

- [x] Current values should be based on the latest price and quantity owned for a given stock.
- [x] Each stock owned should only appear once.

Make new API requests for each stock to get the latest price. Quantity and stock showed once is from trades always manipulating the stock quantity if the user already has owned it before.

### As a user, I'd like to see the front color of stock symbols and current prices in my portfolio change dynamically to indicate performance.

- [x] Display red when the current price is less than the day's open price.
- [x] Display grey when the current price is equal to the day's open price.
- [x] Display green when the current price is greater than the day's open price.

Just implemented by changing className (which changes the CSS) depending on the conditional statements.

### Other things I would like to have implemented if given more time:

- [ ] General code cleanup
- [ ] Unit testing with mocha+chai
- [ ] E2E testing with puppeteer+jest
- [ ] Better code modularity for controllers and frontend pages
- [ ] Deployment to Heroku, with 3rd party service for Postgres DB



## How to get started:

- [ ] Fork this repo and `git clone` your fork.
- [ ] Install dependencies with `npm install`.
- [ ] Setup a firebase web application project with authentication for e-mail and password and get the firebase config, which replaces the current firebase.js file in src/firebase.js
- [ ] Get IEXToken(IEX) and serviceAccount(firebase web project admin) key files like in the examples given under the server/env folder. 

Please contact the project administrators if you have any questions or concerns.

### For development environments:

- Start the Postgres Server.
  - [ ] If using a local Postgres Server, run /db/init/setup.sql to intialize the database.
  - [ ] If using Docker, run `npm run db-start:dev` to create the postgres container on Port 5432. 'setup.sql' will run automatically.
  - [ ] Run the following `npm` scripts concurrently:
  - [ ] `npm run build-client:dev` to watch for changes and compile the client application
  - [ ] `npm run start:dev` to run the server using `nodemon`.

## Credits

Webpack Configuration based on package from [createapp.dev](https://createapp.dev/)
