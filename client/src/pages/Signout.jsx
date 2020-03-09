import React from "react";
import {withRouter}  from "react-router-dom";

const SignOut = (props) => {
  props.auth.signOut()
    .then(function() {
      props.history.push("/login");
      props.signOut();
    })
    .catch(function(error) {
      console.log(error);
    });
  return (<div/>)
}

export default withRouter(SignOut);