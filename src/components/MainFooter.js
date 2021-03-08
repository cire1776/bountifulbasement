import React from "react";
import logo from "../images/bountifulbasementlogo.png";

function MainFooter() {
  return (
    <footer className="main-footer">
      <section className="main">
        <a href="/"></a>
        <article>
          <h2>Bountiful Basement</h2>
          <p>4370 W. 140th Street</p>
          <p>Cleveland, OH 44135</p>
          <p>(216) 671-3870</p>
        </article>
        <article>
          <h2>Food Operations</h2>
          <p>Tuesday: 9:30-12:00</p>
          <p>Wednesday: 5:00-6:45</p>
          <p>Thursday: Closed</p>
        </article>
        <nav>
          <a href="/donate">Donate</a>
          <a href="/volunteer">Volunteer</a>
          <a href="/need-food">Need Food?</a>
        </nav>
      </section>
      <section className="base-footer">
        <h1>
          © 2021 Bountiful Basement. Created by Alpha-Pegasus Media using
          Gatsby.
        </h1>
      </section>
    </footer>
  );
}

export default MainFooter;
