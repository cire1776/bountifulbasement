import React from 'react';
import './MonthSchedule.css';
import {CLOSURE} from '../common.js';

  function MonthSchedule({events,date}) {
    if (!events) return <aside><h1>Loading...</h1></aside>

    const period = date.toLocaleString('default', { month: 'long', year: 'numeric'});
    const month = date.toLocaleString('default', { month: 'short' });
    return(
      <aside>
        <h1>Events for the Month of {period}</h1>

        {
          (Object.keys(events).length ===0)
          ? <h2 class='subdued'>No events scheduled</h2>
          : Object.keys(events).map((day)=>{
            return events[day].map((event)=>{
              if (event.startsWith(CLOSURE)) {
                return <h2 key="closure" className='alert'>{month} {day}: Bountiful Basement Closed</h2>
              } else {
                return <h2 key="event">{month} {day}: {event}</h2>
              }
            })
          })
        }         
      </aside>
    )
 }

export default MonthSchedule
