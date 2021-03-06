import React from "react";
import { withRouter } from "react-router-dom";
const axios = require("axios");

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trackerEntry: "",
      quantityEntry: "",
      balance: "",
      portfolioValue: "",
      stocks: []
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/login');
      } else {
        this.getPortfolio();
      }
    })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event, decision) {
    event.preventDefault();
    const info = {
      tracker: this.state.trackerEntry,
      quantity: this.state.quantityEntry,
      decision: decision
    };
    if (isNaN(this.state.quantityEntry)) {
      alert("Quantity must be a number!");
    } else if (!Number.isInteger(Number(this.state.quantityEntry))) {
      alert("Quantity must be a positive integer!");
    }
    this.props.auth.currentUser.getIdToken(true)
      .then((token) => {
        return axios.post('/api/portfolio', info, {headers: {'Authorization': token}})
      })
      .then((result) => {
        let data = result.data;
        if (data.alert) {
          alert(data.alert);
        } else {
          this.getPortfolio();
        }
      })
      .catch((err) => {
        console.log(err);
      }) 
  }

  getPortfolio(attempted) {
    this.props.auth.currentUser.getIdToken(true)
      .then((token) => {
        return axios.get('/api/portfolio', {headers: {'Authorization': token}})
      })
      .then((portfolio) => {
        this.setState({
          loading: false,
          balance: portfolio.data.balance,
          trackerEntry: "",
          quantityEntry: "",
          portfolioValue: portfolio.data.portfolioValue.toFixed(2),
          stocks: this.colorStocks(portfolio.data.stocks)
        });
      })
      .catch((err) => {
        console.log(err);
        if (!attempted) {
          setTimeout(() => {
            this.getPortfolio(true)
          }, 500);
        }
      }) 
  }

  colorStocks(stocks) {
    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];
      if (stock.currentPrice === stock.openPrice) stock.color = "Grey";
      else if (stock.currentPrice > stock.openPrice) stock.color = "Green";
      else stock.color = "Red";
    }
    return stocks;
  }

  render() {
    return(
      <div>
        {this.state.loading && (
          <h2>Portfolio (Loading...)</h2>
        )}
        {!this.state.loading && (
          <div>
            <div className="box">
              <h2>Cash - ${this.state.balance}</h2>
              <form onSubmit={(event) => this.handleSubmit(event, "buy")}>
                <label>
                  Tracker:
                  <input
                    name="trackerEntry"
                    value={this.state.trackerEntry}
                    onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                  Quantity:
                  <input
                    name="quantityEntry"
                    value={this.state.quantityEntry}
                    onChange={this.handleChange} />
                </label>
                <br/>
                <input className="button" type="submit" value="Buy"/>
                <button className="button" onClick={(event) => this.handleSubmit(event, "sell")}>Sell</button>
              </form>
            </div>
            <h2>Portfolio (${this.state.portfolioValue})</h2>
            <div className="stockContainer">
              {this.state.stocks.map((stock) => {
                if (stock.quantity > 0) {
                  return (
                    <div className={`stock${stock.color}`} key={stock.id}>
                      {`${stock.tracker} - ${stock.quantity} Shares Open: $${stock.openPrice.toFixed(2)} Now: $${stock.currentPrice.toFixed(2)} Total: $${stock.totalValue}`}
                    </div>)
                }
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Portfolio);