import React from "react";
import Layout from "../../components/layout";
import "./about.scss";

function AboutUs() {
  return (
    <Layout classname="about">
      <article>
        <h1>Mission Statement</h1>
      </article>
      <article>
        <h1>History</h1>
      </article>
      <article>
        <h1>Partners</h1>
        <p>
          Serving our community at the level that we do would not be possible
          without the support of our partners.
        </p>
        <h2>Blessed Trinity Parish</h2>
        <p>
          Generously,{" "}
          <a href="http://blessedtrinitycleveland.org">Blessed Trinity</a>{" "}
          provides our building, freezer space and pays for all of the
          electricity that we use.  This allows us to spend more of our precious resources on food.</p>
          <p>Many, if not most, of our volunteers are
          members of the parish.
        </p>
        <h2>Hunger Network of Cleveland</h2>
        <h3>"No one goes hungry. No food goes to waste."</h3>
        <p>
          That is the mission of the{" "}
          <a href="http://hungernetwork.org">Hunger Network of Cleveland</a>.
          They primarily are a network of food pantries throughout Greater
          Cleveland. The Bountiful Basement is proud to be a member of that
          network. The Hunger Network has divided the Greater Cleveland area
          into service areas, each with its own pantry. Our service area
          consists mostly of parts of 44135 and 44111. They also provide our
          foundational funding, providing substantial resources each month.
        </p>
        <h2>Greater Cleveland Food Bank</h2>
        <p>
          The bulk of the food we give out comes from the{" "}
          <a href="http://greaterclevelandfoodbank.org">
            Greater Cleveland Food Bank
          </a>
          . Every Monday, we recieve a delivery of nutritious food from the food
          bank. Some of these products we recieve for free; for others, we pay a
          discounted price. Overall, we pay pennies on the dollar for the food
          we recieve relative to buying the products at a retail store.
        </p>
        <h2>Bellaire-Puritas Development Corporation</h2>
        <p>
          The{" "}
          <a href="http://bpdc.org">Bellaire-Puritas Development Corporation</a>{" "}
          has been instrumental during the COVID pandemic in finding and
          administering several grants. These extra resources have allowed us to
          distribute seven days worth of food for each family. They also have
          provided thousand of dollars in cleaning supplies which we normally
          cannot afford to purchase.
        </p>
        <p>
          On top that, several employees from BPDC, donate their time helping us
          during deliveries and during our food operations.
        </p>
      </article>
    </Layout>
  );
}

export default AboutUs;
