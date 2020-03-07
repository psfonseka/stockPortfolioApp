import React from "react";
import { withRouter } from "react-router-dom";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/login');
      } else {
      this.props.auth.currentUser.getIdToken(true)
        .then((token) => {
          console.log("transactions", token);
          console.log(this.props.auth.currentUser)
        })
      }
    })
  }

  render() {
    // this.props.auth.currentUser.getIdToken(true)
    //   .then((token) => {
    //     console.log("portfolio", token);
    //   })
    return(
      <h2>
        Transactions
      </h2>
    )
  }
}

export default withRouter(Transactions);