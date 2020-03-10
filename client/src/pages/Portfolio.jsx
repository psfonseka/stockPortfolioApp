import React from "react";
import { withRouter } from "react-router-dom";
const axios = require("axios");

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackerEntry: "",
      quantityEntry: ""
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

  handleSubmit(event) {
    event.preventDefault();
    const buy = {
      tracker: this.state.trackerEntry,
      quantity: this.state.quantityEntry
    };
    console.log(this.state.trackerEntry);
    console.log(this.state.quantityEntry);
    if (isNaN(this.state.quantityEntry)) {
      alert("Quantity must be a number!");
    } else if (!Number.isInteger(Number(this.state.quantityEntry))) {
      alert("Quantity must be a positive integer!");
    }
    this.props.auth.currentUser.getIdToken(true)
      .then((token) => {
        return axios.post('/api/portfolio', buy, {headers: {'Authorization': token}})
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      }) 
  }

  getPortfolio() {
    this.props.auth.currentUser.getIdToken(true)
      .then((token) => {
        return axios.get('/api/portfolio', {headers: {'Authorization': token}})
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      }) 
  }

  render() {
    return(
      <div>
        <h2>Portfolio ($5000.00)</h2>
        <div className="box">
          <h2>Cash - $5000.00</h2>
          <form onSubmit={this.handleSubmit}>
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
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Portfolio);