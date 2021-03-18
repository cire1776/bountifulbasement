import React from "react";
import { Link } from "gatsby";
import Layout from "../../components/layout";
import CallToAction from "../../components/CallToAction";
import foodDriveGuide from "../../assets/food-drive-guide.pdf";
import "./difference.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faHandHoldingUsd,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
function Difference() {
  return (
    <Layout title="Make a Difference">
      <section className="difference">
        <article>
          <Link to="#host-a-food-drive">
            <FontAwesomeIcon icon={faAppleAlt} size="4x" />
            <h1>Give Food</h1>
          </Link>{" "}
          <p>
            Host a food drive or shop for food you enjoy to share with others in
            the neighborhood.
          </p>
        </article>
        <article>
          <Link to="#give-money">
            <FontAwesomeIcon icon={faHandHoldingUsd} size="4x" />
            <h1>Give Money</h1>
          </Link>{" "}
          <p>
            Thanks to our partnership with the Greater Cleveland Food Bank, we
            can purchase food for pennies on the dollar compared to retail
            grocers.
          </p>
        </article>
        <article>
          <Link to="#volunteer">
            <FontAwesomeIcon icon={faClock} size="4x" />
            <h1>Give Your Time</h1>
          </Link>{" "}
          <p>
            Your time is one of our most precious gifts. Join our energetic, fun
            crew and experience the joy of serving our most needy families.
          </p>
        </article>
      </section>
      <CallToAction />
      <a id="host-a-food-drive" />
      <section className="host-a-food-drive">
        <figure />
        <article>
          <FontAwesomeIcon icon={faAppleAlt} size="4x" />
          <h1>Host a Food Drive</h1>
          <p>
            Hosting a drive is a great way to partner with the Bountiful
            Basement Food Pantry and join the fight against food-insecurity.
            When it comes to feeding families, your drive is an easy way to
            collect non-perishable food items and make a difference in the lives
            of the families we serve. Gather your corporation, community
            organization or family and friends to help coordinate and collect
            items on a larger scale!
          </p>
          <h2>
            <a href={foodDriveGuide}>Get the Guide</a>
          </h2>
          <h2>
            <Link to="/register-drive/">Register a Drive</Link>
          </h2>
        </article>
      </section>
      <CallToAction />
      <a id="give-money" />{" "}
      <section className="give-money">
        <figure />
        <article>
          <FontAwesomeIcon icon={faHandHoldingUsd} size="4x" />
          <h1>Give Money</h1>
          <p>
            Partnering with the Greater Cleveland Food Bank allows us to extend
            our buying power and acquire much of our food for pennies on the
            dollar compared to traditional retail stores. In addition, we have
            monthly food transportation expenses that we must cover.
          </p>
          <h2>
            <Link to="/difference/donate">Read More</Link>{" "}
          </h2>
        </article>
      </section>
      <CallToAction />
      <a id="volunteer" />{" "}
      <section className="volunteer">
        <figure />
        <article>
          <FontAwesomeIcon icon={faClock} size="4x" />
          <h1>Give Your Time</h1>
          <p>
            Our volunteers are the heart and soul of the Bountiful Basement.
            Without them, not one bag of food would reach our families in need
          </p>
          <h2>
            {" "}
            <Link to="/difference/volunteer/">Read More</Link>
          </h2>
        </article>
      </section>
    </Layout>
  );
}

export default Difference;
