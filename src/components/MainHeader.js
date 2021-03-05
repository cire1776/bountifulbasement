import React from "react";
import "../App.scss";
import logo from "../images/bountifulbasementlogo.png";

import netlifyIdentity from "netlify-identity-widget";
import AlertBar from "./AlertBar";

function MainHeader() {
  return (
    <>
      <AlertBar />
      <header className="main-header">
        <a href="/">
          <img className="logo" src={logo} alt="Bountiful Basement" />
        </a>
        <nav>
          <label htmlFor="hamburger">&#9776;</label>
          <input type="checkbox" id="hamburger" />

          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/calendar">Calendar</a>
            </li>
            <li>
              <a href="/news">What's New</a>
            </li>
            <li>
              <a href="/difference">Make a Difference</a>
            </li>
            <li>
              <a href="/recipes">Need Food?</a>
            </li>
            <li>
              <a href="/community">Resources</a>
            </li>
            {netlifyIdentity.currentUser() ? (
              <li onClick={() => netlifyIdentity.logout()}>Logout</li>
            ) : (
              <li onClick={() => netlifyIdentity.open()}>Login</li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
