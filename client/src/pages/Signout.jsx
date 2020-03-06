import React from "react";
import {withRouter}  from "react-router-dom";

const Signout = (props) => {
  props.auth.signOut()
    .then(function() {
      props.history.push("/login");
    })
    .catch(function(error) {
      console.log(error);
    });
  return (<div/>)
}

export default withRouter(Signout);