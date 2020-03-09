import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Portfolio from "../pages/Portfolio";
import Transactions from "../pages/Transactions";
import SignOut from "../pages/SignOut";
import firebase from "firebase";
import firebaseConfig from "../firebase"

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    // Determine possible routes based on whether there is a user logged in
    firebaseAppAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      }
    })
  }

  signOut() {
    this.setState({
      loggedIn: false
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul className="links">
              {this.state.loggedIn && (
                <div>
                  <li className="link">
                    <Link to="/signout">SignOut</Link>
                  </li> 
                  <li className="link">
                    <Link to="/portfolio">Portfolio</Link>
                  </li> 
                  <li className="link">
                    <Link to="/transactions">Transactions</Link>
                  </li>
                </div>
              )}
              {!this.state.loggedIn && (
                <div>
                  <li className="link">
                    <Link to="/login">Login</Link>
                  </li> 
                  <li className="link">
                    <Link to="/signup">Signup</Link>
                  </li>
                </div>
              )}
            </ul>
          </nav>
          <h1>Stock Portfolio App</h1>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login auth={firebaseAppAuth}/>
            </Route>
            <Route path="/signup">
              <Signup auth={firebaseAppAuth}/>
            </Route>
            <Route path="/portfolio">
              <Portfolio auth={firebaseAppAuth}/>
            </Route>
            <Route path="/signout">
              <SignOut auth={firebaseAppAuth} signOut={this.signOut}/>
            </Route>
            <Route path="/transactions">
              <Transactions auth={firebaseAppAuth}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
