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
import Signout from "../pages/Signout";
import firebase from "firebase";
import firebaseConfig from "../firebase"

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>Stock Portfolio App</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/signout">Signout</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
            </ul>
          </nav>
  
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
              <Signout auth={firebaseAppAuth}/>
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

// const Signout = () => {
//   firebaseAppAuth.signOut().then(function() {
//     useHistory().push("/login");
//   }).catch(function(error) {
//     // An error happened.
//     console.log(error);
//   });
//   return (<div/>)
// }
export default App;
