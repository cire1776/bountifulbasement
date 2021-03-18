import React from "react";
import Layout from "../components/layout";
import CallToAction from "../components/CallToAction";
import bbsign from "../assets/bb-sign 2.jpg";

function Index() {
  return (
    <section className="home">
      <Layout title="Main">
        <section className="home">
          <header className="food-insecurity">
            <figure></figure>
            <article>
              <h1>Food In•se•cu•ri•ty</h1>
              <h2>Noun</h2>
              <h3>Food Insecurity</h3>
              <p>
                The state of being without reliable access to a sufficient
                quantity of affordable, nutritious food.
              </p>
              <h1>Did you know?</h1>
              <p>
                Thousands of residents of the West Park/Bellaire-Puritas
                neighborhood face food insecurity at some point throughout the
                year?
              </p>
            </article>
          </header>
          <CallToAction />
          <section className="bb-intro">
            <figure></figure>
            <article>
              <p>
                For over 20 years, the <i>Bountiful Basement</i>, one of the
                Food Ministries of{" "}
                <a href="http://blessedtrinitycleveland.org">
                  Blessed Trinity Parish
                </a>
                , has worked to provide food security to all families in our
                neighborhood.
              </p>
              <p>
                We provide each family that we serve seven days of groceries and
                fresh produce. Families can come once per calendar month.
              </p>
            </article>
          </section>
          <CallToAction />
          <section className="bb-close">
            <figure></figure>
            <article>
              <p>The Bountiful Basement works to keep this plate full.</p>
              <p>
                In COVID-ravaged 2020, the Bountiful Basement served 3,383
                families, a total of 10,493 Individuals. Because of COVID, we
                increased our distribution size to a full seven days worth of
                food instead of the previous three.
              </p>
              <p>
                Last year, the Bountiful Basement served over 247,920 pounds
                (almost 124 TONS!) of nutritious, appetizing food, including
                produce, meat, canned goods and other non-perishable food.
              </p>
            </article>
          </section>
        </section>
      </Layout>
    </section>
  );
}

export default Index;
