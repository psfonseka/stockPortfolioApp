import React from "react";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEntry: "",
      emailEntry: "",
      passwordEntry: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/portfolio');
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.auth.createUserWithEmailAndPassword(this.state.emailEntry, this.state.passwordEntry)
      .then(() => {
        return this.props.auth.currentUser.getIdToken(true)
      })
      .then((token) => {
        return axios.post('/signup', null, {headers: {'Authorization': token}})
      })
      .then((response) => {
        //Axios does not allow redirects from the server, so we have to do it manually with react-router
        this.props.history.push(response.data.redirect);
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        alert(error.message);
    });
  }

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              name="nameEntry"
              value={this.state.nameEntry}
              onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            E-mail:
            <input
              name="emailEntry"
              value={this.state.emailEntry}
              onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Password:
            <input
              name="passwordEntry"
              value={this.state.passwordEntry}
              onChange={this.handleChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default withRouter(Signup);