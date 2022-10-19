import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "./App.scss";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {currentUser ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {currentUser ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
