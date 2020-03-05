import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSubmit(event) {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
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
          <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default Login;