import {CLOSURE} from '../common'

const Airtable = require('airtable-node');

const apiKey = 'keyrXrvJEWWLSjTU2';
const baseID = 'appPJGWfywLNUoPkg';

const airtable = new Airtable({apiKey})
    .base(baseID)
    .table('events');

export const isScheduled = (date,events) => {
    const day = date.getDate();
    if (!events || !events[day]) return false;
    const cleanEvents = events[day].filter((event)=> !event.description.startsWith(CLOSURE));
    return cleanEvents.length > 0;
}

export const isClosureEvent = (event) => {
  return event.description.startsWith(CLOSURE)
};

export  const processEventRecords = (records) => {
    return records.reduce((accum, event)=>{
      const dateString = event.fields.date;
      const day = dateString.split("/")[1];
      
      if (!accum[day]) {
        accum[day] = [];
      }
      accum[day].push({id: event.id,description: event.fields.description})
      return accum
    },{})
  }

export async function fetchMonthsEvents(date, eventSetter) {
    eventSetter(null);
    const criteria = `TRIM(month)="${date.getMonth() + 1}/${date.getFullYear()}"`;
    const { records } = await airtable.list({ filterByFormula: criteria });
    const events = processEventRecords(records);
    eventSetter(events);
}

export function determineEvents(view, date, monthEvents) {
    if (view==='year') {
      return monthEvents;
    } else {
      return (monthEvents && monthEvents[date.getDate()]) || []
    }
  }

export const determineStatus = (date,monthEvents) => {
    let newStatus='normally-closed';

    const dayOfWeek = date.getDay();
    const day = date.getDate();

    switch(dayOfWeek) {
      case 1:
        newStatus = 'delivery';
        break;
      case 2:
        newStatus = 'open-morning';
        break;
      case 3:
        newStatus = 'open-evening';
        break;
      default:
        newStatus = 'normally-closed';
    };

    if(monthEvents && monthEvents[day] && monthEvents[day].some(isClosureEvent)) {
      newStatus = 'closed';
    }

    return(newStatus);
  }
  