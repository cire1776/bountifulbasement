import React from "react";
import Layout from "../../components/layout";

function Volunteer() {
  return (
    <Layout classname="main-volunteer" title="Volunteers">
      <header>
        <h1>Our Volunteers</h1>
      </header>
      <article>
        <p>
          Our volunteers are the heart and soul of the Bountiful Basement.
          Without them, not one bag of food would reach the families that need
          it. The loving, fun and energetic people that give of their own time
          express the love we have for the families that seek help with food.
        </p>
        <p>
          Bagger, Bag Maker, Bread Supervisor, Stocker, Cleanup, Traffic
          Director, Carrier, Runner, Order-taker and Registrar. These are the
          roles available for our volunteers.
        </p>
        <dl>
          <h1>Job Descriptions</h1>
          <h2>
            Tuesday, Wednesday and <span>Thursdsay</span>
            <br />
            Food Operations
          </h2>
          <dt>Bagger</dt>
          <dd>
            Indoors. Baggers pull food from the shelves and pack the bags that
            will go to our clients.
          </dd>
          <dt>Bag Maker</dt>
          <dd>
            Indoors. Each client recieves seven to 12 bags of grocery. Each one
            of those bags needs to be preassembled before hand.
          </dd>
          <dt>Bread Supervisor</dt>
          <dd>
            Indoors. We receive bread and pastries from local supermarkets every
            day we are open. The bread person distributes this bread to each
            family.
          </dd>
          <dt>Stocker</dt>
          <dd>
            Mostly Indoors. During the distribution, the stocker will replenish
            the baggers' shelves. This makes sure that there are no delays in
            getting out the food. After the session, the stockers fully restock
            the shelves to prepare for the next session.
          </dd>
          <dt>Cleanup</dt>
          <dd>
            Mostly Indoors. The cleanup person works throughout the session
            trying to keep up on tearing down cardboard boxes and help the
            stocker keep up with demand.
          </dd>
          <dt>Traffic Director</dt>
          <dd>
            Outdoors. The traffic director manages the lineup of cars and
            passess out numbers to each household.
          </dd>
          <dt>Carrier</dt>
          <dd>
            Outdoors. Carriers are responsible for delivering bags to the next
            car in line and when done retrieving the number for the car.
            Requires lifting of up to 25 pounds.
          </dd>
          <dt>Runner</dt>
          <dd>
            Outdoors. Runners connect the order takers with the registrar
            carrying the order slips from outside to the computer inside.
          </dd>
          <dt>Order Taker</dt>
          <dd>
            Outdoors. Order takers are responsible for completing an order slip
            for each household. This includes checking IDs, confirming
            eligibility and allowing the client to customize their order.
          </dd>
          <dt>Registrar</dt>
          <dd>
            Indoors. The registrar enters the client's information into the
            computer.
          </dd>
          <h2>Monday Delivery</h2>
          <dt>Unloader</dt>
          <dd>
            Outdoors. Unloaders unload the pallets of food. Requires lifting of
            up to 50 pounds.
          </dd>
          <dt>Stocker</dt>
          <dd>
            Indoors. Stockers put away the cases of food. Requires lifting of up
            to 35 pounds.
          </dd>
        </dl>

        <p>Please dress appropriately for either indoor or outdoor activity.</p>
      </article>
    </Layout>
  );
}

export default Volunteer;
