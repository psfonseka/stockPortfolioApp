import React from "react";
import { withRouter } from "react-router-dom";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
    console.log("happened");
    if (!this.props.auth.currentUser) {
      this.props.history.push('/login');
    } else {
      this.props.auth.currentUser.getIdToken(true)
      .then((token) => {
        console.log("portfolio", token);
        console.log(this.props.auth.currentUser)
      })
    }
  }

  render() {
    // this.props.auth.currentUser.getIdToken(true)
    //   .then((token) => {
    //     console.log("portfolio", token);
    //   })
    return(
      <div>
        Portfolio Will Be Here!
      </div>
    )
  }
}

export default withRouter(Portfolio);