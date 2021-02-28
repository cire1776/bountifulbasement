import React, { useEffect, useState, useRef } from "react";
import Protected from "../../components/Protected";
import MainHeader from "../../components/MainHeader";
import BBCalendar from "../../components/BBCalendar";
import {
  fetchAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../components/event";
import pencil from "../../images/pencil.svg";
import trashcan from "../../images/trash.svg";
import plus from "../../images/plus.svg";
import "./editor.css";

function CalendarEditor() {
  const [events, setEvents] = useState([]);
  const eventSetter = useRef(null);
  const [editedItemId, setEditedItemId] = useState(null);
  const editField = useRef();

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [editedItemId]);

  useEffect(() => {
    if (eventSetter.current) {
      eventSetter.current(events);
    }
  }, [events]);

  function displayDailySchedule(date, events, status) {
    function handleInput() {
      if (editedItemId === 0) {
        addEvent(
          date.toLocaleDateString(),
          editField.current.value,
          events,
          setEvents
        );
      } else {
        updateEvent(editedItemId, editField.current.value, events, setEvents);
      }

      setEditedItemId(null);
    }

    return (
      <section>
        <h1>{date.toLocaleDateString()}</h1>
        <ul>
          {events.length === 0 ? (
            <h2>No Events Yet</h2>
          ) : (
            events.map((event) => {
              const { id, description, date } = event;
              return editedItemId === id ? (
                <li>
                  <input ref={editField} type="text" onBlur={handleInput} />
                </li>
              ) : (
                <li key={id}>
                  <h2>{description}</h2>
                  <img
                    src={pencil}
                    alt="edit"
                    onClick={(e) => {
                      setEditedItemId(id);
                    }}
                  />
                  <img
                    src={trashcan}
                    alt="trashcan"
                    onClick={(e) => {
                      deleteEvent(event.id, events, setEvents);
                    }}
                  />
                </li>
              );
            })
          )}

          {editedItemId === 0 && (
            <input type="text" onBlur={handleInput} ref={editField} />
          )}
        </ul>
        {editedItemId === null && (
          <button type="button" onClick={(event) => setEditedItemId(0)}>
            <img src={plus} alt="add" />{" "}
          </button>
        )}
      </section>
    );
  }

  function displayMonthlySchedule(date, events) {
    return <h1>Editing not yet implemented for Months</h1>;
  }

  function displaySchedule(view, date, events, status) {
    switch (view) {
      case "month":
        return displayDailySchedule(date, events);
      case "year":
        return displayMonthlySchedule(date, events);
      default:
        break;
    }
  }

  React.useEffect(() => {
    fetchAllEvents(setEvents);
  }, []);

  if (!events) {
    return <h1>Loading...</h1>;
  }

  return (
    <Protected>
      <MainHeader />
      <section className="editor">
        <BBCalendar
          displayer={displaySchedule}
          registerEventSetter={(setter) => (eventSetter.current = setter)}
        />
      </section>
    </Protected>
  );
}

export default CalendarEditor;
