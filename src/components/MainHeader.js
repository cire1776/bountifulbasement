import React from "react";
import { Link } from "gatsby";
import "../App.scss";
import logo from "../images/bountifulbasementlogo.png";

import netlifyIdentity from "netlify-identity-widget";
import AlertBar from "./AlertBar";

function MainHeader() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", checkinUser);
    netlifyIdentity.on("logout", checkoutUser);
    setUser(netlifyIdentity.currentUser());
  }, []);

  function logout() {
    netlifyIdentity.logout();
  }

  function login() {
    netlifyIdentity.open();
  }

  function checkinUser(user) {
    setUser(user);
  }

  function checkoutUser() {
    setUser(null);
  }

  return (
    <>
      <AlertBar />
      <header className="main-header">
        <Link to="/">
          <img className="logo" src={logo} alt="Bountiful Basement" />
        </Link>
        <nav>
          <label htmlFor="hamburger">&#9776;</label>
          <input type="checkbox" id="hamburger" />

          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/news">What's New</Link>
            </li>
            <li>
              <Link to="/difference">Make a Difference</Link>
            </li>
            <li>
              <Link to="/need-food">Need Food?</Link>
            </li>
            <li>
              <Link to="/community">Resources</Link>
            </li>
            {user ? (
              <li onClick={logout}>Logout</li>
            ) : (
              <li onClick={login}>Login</li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
