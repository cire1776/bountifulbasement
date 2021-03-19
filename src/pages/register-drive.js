import React from "react";
import Layout from "../components/layout";
import "./register-drive.scss";

function RegisterDrive() {
  return (
    <Layout classname="register-drive">
      <h1>
        I am pleased to host a drive benefitting the Bountiful Basement Food
        Pantry. I agree to abide by the Host A Drive Guidelines.
      </h1>
      <form name="register-drive" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="register-drive" />
        <fieldset className="contact-info">
          <legend>Contact Infomation</legend>
          <label htmlFor="name">
            Name: <input type="text" name="name" id="name" />
          </label>

          <label htmlFor="address">
            Address
            <input type="text" name="address" id="address" />
          </label>

          <div>
            <label htmlFor="city">
              City
              <input type="text" name="city" id="city" />
            </label>

            <label htmlFor="state">
              State
              <input type="text" name="state" id="state" />
            </label>

            <label htmlFor="zip">
              Zip
              <input type="text" name="zip" id="zip" />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone <input type="text" name="phone" id="phone" />
            </label>

            <label htmlFor="email">
              Email <input type="text" name="email" id="email" />
            </label>
          </div>
        </fieldset>
        <fieldset className="drive-info">
          <legend>Drive Information</legend>

          <label htmlFor="start-date">
            Start Date
            <input type="text" name="start-date" id="start-date" />
          </label>

          <label htmlFor="end-date">
            End Date
            <input type="text" name="drive-end-date" id="drive-end-date" />
          </label>

          <label htmlFor="delivery-date">
            Delivery Date
            <input type="text" name="delivery-date" id="delivery-date" />
          </label>
        </fieldset>
        <h1>
          Please schedule a time to drop off your donations during our drop off
          times:
        </h1>
        <p>Monday: 10AM-1PM, Tuesday: 9:AM-11:30AM, Wednesday: 4PM-6:45PM</p>
        <button type="submit">Register</button>
      </form>
    </Layout>
  );
}

export default RegisterDrive;