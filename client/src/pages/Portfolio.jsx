import React from "react";
import { withRouter } from "react-router-dom";

class Portfolio extends React.Component {
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
          console.log("portfolio", token);
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
        Portfolio ($5000.00)
      </h2>
    )
  }
}

export default withRouter(Portfolio);