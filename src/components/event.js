import { CLOSURE } from "../common";

const Airtable = require("airtable-node");

const baseID = "appPJGWfywLNUoPkg";

const airtable = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API_KEY })
  .base(baseID)
  .table("events");

export const isScheduled = (date, events) => {
  const day = date.getDate();
  if (!events || !events[day]) return false;
  const cleanEvents = events[day].filter(
    (event) => !event.description.startsWith(CLOSURE)
  );
  return cleanEvents.length > 0;
};

export const isClosureEvent = (event) => {
  return event.description.startsWith(CLOSURE);
};

export const processEventRecordsByDate = (records) => {
  return records.reduce((accum, event) => {
    const dateString = event.fields.date;
    const day = dateString.split("/")[1];

    if (!accum[day]) {
      accum[day] = [];
    }
    accum[day].push({ id: event.id, description: event.fields.description });
    return accum;
  }, {});
};

function processEventRecords(records) {
  const events = records.map((record) => {
    return { ...record.fields, id: record.id };
  });

  return events;
}

export async function fetchAllEvents(eventSetter) {
  eventSetter(null);
  const { records } = await airtable.list();
  const events = processEventRecords(records);
  eventSetter(events);
}

export async function fetchMonthsEvents(date, eventSetter) {
  eventSetter(null);
  const criteria = `TRIM(month)="${date.getMonth() + 1}/${date.getFullYear()}"`;
  const { records } = await airtable.list({ filterByFormula: criteria });
  const events = processEventRecordsByDate(records);
  eventSetter(events);
}

export async function addEvent(date, description, events, eventSetter) {
  const { id, fields } = await airtable.create({
    fields: { date, description },
  });

  const newEvents = [...events, fields];
  eventSetter(newEvents);
}

export async function updateEvent(id, description, events, eventSetter) {
  const data = await airtable.update(id, { fields: { description } });
  const event = events.find((event) => event.id === id);
  event.description = description;
  eventSetter(events);
}

export async function deleteEvent(id, events, eventSetter) {
  const data = await airtable.delete(id);

  const newEvents = events.filter((event) => event.id !== id);
  eventSetter(newEvents);
}

export function determineEvents(view, date, monthEvents) {
  if (view === "year") {
    return monthEvents;
  } else {
    return (monthEvents && monthEvents[date.getDate()]) || [];
  }
}

export const determineStatus = (date, monthEvents) => {
  let newStatus = "normally-closed";

  const dayOfWeek = date.getDay();
  const day = date.getDate();

  switch (dayOfWeek) {
    case 1:
      newStatus = "delivery";
      break;
    case 2:
      newStatus = "open-morning";
      break;
    case 3:
      newStatus = "open-evening";
      break;
    default:
      newStatus = "normally-closed";
  }

  if (
    monthEvents &&
    monthEvents[day] &&
    monthEvents[day].some(isClosureEvent)
  ) {
    newStatus = "closed";
  }

  return newStatus;
};
