import React from "react";
import "react-calendar/dist/Calendar.css";
import "./DaySchedule.css";
// require('dotenv').config();

function DaySchedule({ date, events, status }) {
  if (!date) {
    return <></>;
  }

  date = date.toLocaleDateString();

  if (events === null) {
    return (
      <aside className="day-schedule">
        <h1>{date}</h1>
        <h2>Loading...</h2>
      </aside>
    );
  }
  const cleanEvents = events.filter((event) => !event.startsWith("closure"));

  const reasonForClosure = () => {
    const event = events.find((event) => event.startsWith("closure"));
    let reason = "";
    if (event && event.startsWith("closure")) {
      const terms = event.split(":");
      if (terms.length > 1) {
        reason = terms[1];
      }
    }
    return reason;
  };

  return (
    <aside className="day-schedule">
      <h1>{date}</h1>
      {status === "closed" && (
        <>
          <h2 className="alert">Bountiful Basement Closed</h2>
          <p>{reasonForClosure()}</p>
        </>
      )}
      {status === "delivery" && (
        <h2 className="primary">10:00-2:00 Bountiful Basement Delivery</h2>
      )}
      {status === "open-morning" && (
        <h2 className="primary">9:30-12:00 Bountiful Basement Open</h2>
      )}
      {status === "open-evening" && (
        <h2 className="primary">5:00-6:45 Bountiful Basement Open</h2>
      )}

      <ul>
        {cleanEvents.map((event, index) => {
          return <li key={event}>{event}</li>;
        })}
        {cleanEvents.length === 0 &&
          events.length === 0 &&
          status === "normally-closed" && <li>No Events</li>}
      </ul>
    </aside>
  );
}

export default DaySchedule;
