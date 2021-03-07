import React from "react";
import logo from "../images/bountifulbasementlogo.png";

function MainFooter() {
  return (
    <footer className="main-footer">
      <section className="main">
        <a href="/"></a>
        <div>
          <h2>Bountiful Basement</h2>
          <p>4370 W. 140th Street</p>
          <p>Cleveland, OH 44135</p>
          <p>(216) 671-3870</p>
        </div>
        <nav>
          <a href="/donate">Donate</a>
          <a href="/volunteer">Volunteer</a>
          <a href="/need-food">Need Food?</a>
        </nav>
      </section>
      <section>
        <h1>
          © 2021 Bountiful Basement. Created by Alpha-Pegasus Media using
          Gatsby.
        </h1>
      </section>
    </footer>
  );
}

export default MainFooter;
