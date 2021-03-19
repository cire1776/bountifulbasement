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
            Name: <input type="text" name="name" id="name" required />
          </label>

          <label htmlFor="company">
            Organization
            <input type="text" name="company" id="company" />
          </label>

          <label htmlFor="address">
            Address
            <input type="text" name="address" id="address" required />
          </label>

          <div>
            <label htmlFor="city">
              City
              <input type="text" name="city" id="city" required />
            </label>

            <label htmlFor="state">
              State
              <input type="text" name="state" id="state" required />
            </label>

            <label htmlFor="zip" required>
              Zip
              <input type="text" name="zip" id="zip" />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone <input type="text" name="phone" id="phone" required />
            </label>

            <label htmlFor="email">
              Email <input type="text" name="email" id="email" required />
            </label>
          </div>
        </fieldset>
        <fieldset className="drive-info">
          <legend>Drive Information</legend>
          <label htmlFor="drive-type">
            Drive Type{" "}
            <select name="drive-type">
              <option value="food">Food</option>
              <option value="toiletry">Toiletry &amp; Cleaning Supply</option>
              <option value="pet-food">Pet Food</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <label htmlFor="start-date">
            Start Date
            <input type="text" name="start-date" id="start-date" required />
          </label>

          <label htmlFor="end-date">
            End Date
            <input
              type="text"
              name="drive-end-date"
              id="drive-end-date"
              required
            />
          </label>

          <label htmlFor="delivery-date">
            Delivery Date
            <input
              type="text"
              name="delivery-date"
              id="delivery-date"
              required
            />
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
