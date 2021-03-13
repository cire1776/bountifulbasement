import React from "react";
import Layout from "../../components/layout";
import { Link } from "gatsby";
import eligibility from "../../assets/eligibility-guidelines.pdf";
import "./need-food.scss";

function NeedFood() {
  return (
    <Layout title="Need Food">
      <section className="need-food">
        <header>
          <h1>Food Distribution Hours</h1>
          <h2>Tuesday</h2>
          <p>9:30 AM - 12 Noon</p>
          <h2>Wednesday</h2>
          <p>5:00 PM - 6:45 PM</p>
          <h2>Thursday</h2>
          <p>Closed During Pandemic</p>
        </header>
        <section className="policies">
          <div className="column">
            <article>
              <h1>Who's Eligible</h1>
              <p>
                The Hunger Network of Greater Cleveland defines our service
                area. While not based upon zip codes, our residency area
                includes parts of 44135 and 44111.
              </p>
              <p>
                You must also meet the federal income requirements defined{" "}
                <a href={eligibility}>here</a>.
              </p>
            </article>
            <article>
              <h1>What to Bring</h1>
              <p>
                Each time you come, please bring picture identification such as
                a driver’s license, state ID, or green card. The first time you
                come, bring a recent piece of mail such as an electric bill or
                phone bill showing your current address. If your photo ID shows
                a different address, you will need to bring a recent piece of
                mail every time you come.
              </p>
            </article>
            <article>
              <h1>COVID Precautions</h1>
              <p>
                In order to minimize risk of exposure, we are taking the
                following precautions:
                <ul>
                  <li>
                    If you feel ill or are exhibiting COVID symptoms, please
                    stay home.
                  </li>
                  <li>
                    Our personnel cannot accept anything from your vehicle. Hold
                    up your documentation for our registrar to verify.
                  </li>
                  <li>
                    Access to the building is limited to volunteers only. Sorry,
                    no restrooms are availble.
                  </li>
                  <li>If you are in a vehicle, please stay in your car.</li>
                  <li>
                    Mask wearing and social distancing are strictly enforced.
                    Physical contact, including fist- or elbow-bumping, is not
                    allowed.
                  </li>
                </ul>
              </p>
            </article>
          </div>
          <div className="column">
            <article>
              <h1>If You Are Walking</h1>
              <p>
                Please wait in the area outside of the door. Make sure you
                maintain proper social distancing. Face masks are required.
                Walkers will recieve expedited service.
              </p>
              <p>
                When you arrive, our registrar will give you a letter and take
                your order. Keep this letter until your food arrives. We provide
                seven-days of food, so we recommend that you bring some form of
                cart.
              </p>
            </article>
            <article>
              <h1>If you are Driving</h1>
              <p>
                During the pandemic, we provide curb-side service. On mornings
                when school is in session, cars will line-up in our parking lot.
                Please back into the space indicated by our traffic director. On
                Wednesday evenings, cars line up on the side of the building
                across from Birchwood School.
              </p>
              <p>
                Once in line, you will be given a number. Don't leave until that
                number has been collected or you risk missing some of your food.
                Our registrar will come by to take your order. Please have your
                picture ID ready for them.
              </p>
              <p>
                We distribute a seven-day assortment of food. Make sure that you
                have sufficient space available in your trunk or passenger
                compartment.
              </p>
              <p>Please stay in your car and maintain social distancing.</p>
            </article>
          </div>
        </section>
        <figure></figure>
      </section>
    </Layout>
  );
}

export default NeedFood;
