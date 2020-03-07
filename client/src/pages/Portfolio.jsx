import React from "react";
import { withRouter } from "react-router-dom";
const axios = require("axios");

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    
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
      <h2>
        Portfolio ($5000.00)
      </h2>
    )
  }
}

export default withRouter(Portfolio);