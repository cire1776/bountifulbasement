import React from "react";
import { Link } from "gatsby";
import "../App.scss";
import logo from "../images/bountifulbasementlogo.png";

import netlifyIdentity from "netlify-identity-widget";
import AlertBar from "./AlertBar";

function MainHeader() {
  const [user, setUser] = React.useState(null);
  const checkbox = React.useRef(null);

  React.useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", checkinUser);
    netlifyIdentity.on("logout", checkoutUser);
    setUser(netlifyIdentity.currentUser());
  }, []);

  function logout() {
    netlifyIdentity.logout();
    closeNavBar();
  }

  function login() {
    netlifyIdentity.open();
    closeNavBar();
  }

  function checkinUser(user) {
    setUser(user);
  }

  function checkoutUser() {
    setUser(null);
  }

  function closeNavBar() {
    checkbox.current.checked = false;
  }

  return (
    <>
      <header className="outer-header">
        <AlertBar />
        <section className="main-header">
          <Link to="/">
            <figure className="logo" />
          </Link>
          <nav>
            <label htmlFor="hamburger">&#9776;</label>
            <input type="checkbox" id="hamburger" ref={checkbox} />

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
        </section>
      </header>
    </>
  );
}

export default MainHeader;
