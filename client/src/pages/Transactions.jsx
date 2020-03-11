import React from "react";
import { withRouter } from "react-router-dom";
const axios = require("axios");

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/login');
      } else {
        this.getTransactions();
      }
    })
  }

  getTransactions() {
    this.props.auth.currentUser.getIdToken(true)
      .then((token) => {
        return axios.get('/api/transactions', {headers: {'Authorization': token}})
      })
      .then((data) => {
        console.log(data);
        this.setState({
          transactions: data.data
        });
      })
      .catch((err) => {
        console.log(err);
      }) 
  }

  render() {
    return(
      <div>
        <h2>
          Transactions
        </h2>
        <div className="transactionContainer">
          {this.state.transactions.map((transaction) => {
            return (
            <div className="transaction" key={transaction.id}>
              {`${transaction.trade.toUpperCase()} (${transaction.tracker}) - ${transaction.quantity} Shares @ ${transaction.price}`}
            </div>)
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(Transactions);