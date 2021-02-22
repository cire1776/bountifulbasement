import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import DaySchedule from '../components/DaySchedule'
import MonthSchedule from '../components/MonthSchedule'
import 'react-calendar/dist/Calendar.css';
import {isScheduled,fetchMonthsEvents,
        determineEvents,determineStatus} from '../components/event.js';
import {TODAY, NEXT_YEAR} from '../common.js';

/*
  delivery
  normally-closed
  closed
  open-morning
  open-evening
*/

function BBCalendar({displayer, registerEventSetter}) {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('normally-closed')
  const [month, setMonth] = useState("");
  const [monthEvents, setMonthEvents] = useState(null)
  const [events, setEvents] = useState([])
  const [view, setView] = useState('month')

  const onChange = (date) => {
    setDate(date);
  }

  const onMonthChange = ({activeStartDate}) => {
    const newMonth = activeStartDate.toLocaleDateString().replace("/d?d/", "/")
    setMonth(newMonth);
    setDate(activeStartDate)
  }

  function styleDailyTiles(date, status, isScheduled) {
    const styles = [];

    if(isScheduled) {
      styles.push('scheduled','jiggle')
    }

    switch (status) {
      case 'open-morning':
      case 'open-evening':
        styles.push('open');
        break;
      case 'delivery':
        styles.push('delivery');
        break;
      case 'closed':
        styles.push('closed');
        break;
      default:
        styles.push('normally-closed')
    }

    return styles;
  }

  function styleMonthlyTiles(date) {
    return ('');
  }

  function styleTiles({date, view}) {
    const status = determineStatus(date,monthEvents)

    switch (view) {
      case 'month':
        return styleDailyTiles(date,status, isScheduled(date,monthEvents));
      case 'year':
        return styleMonthlyTiles(date,status, isScheduled(date,monthEvents));
      default:
        break;
    }
  }

  function processEvents(events) {
    return events.map((event)=>{
      return event.description
    })
  }

  const displaySchedule = (view, date, events, status) => {
    const simpleEvents = processEvents(events);
    switch (view) {
      case 'month':
        return <DaySchedule date={date} events={simpleEvents} status={status}/>
      case 'year':
        return <MonthSchedule date={date} events={simpleEvents} status={status}/>
      default:
        break;
    }
  }
        
  const onViewChange = ({activeStartDate, value, view}) => {
    if (view === 'month') {
      setDate(activeStartDate);
    } else if (view === 'year') {
      setDate(value);
    }
    setView(view);
  }
     
  useEffect(() => {
    if (registerEventSetter) {
      registerEventSetter(setEvents);
    }
    return () => {
      registerEventSetter(null);
    }
  }, []
  )
  useEffect(() =>{
      fetchMonthsEvents(date,setMonthEvents);
  },[date, month])

  useEffect(() => {
      setStatus(determineStatus(date,monthEvents))
      setEvents(determineEvents(view,date,monthEvents));
  },[date,monthEvents,view])

  useEffect(()=>{
  }, [events])


  if (!displayer) {
    displayer = displaySchedule;
  }

  return (
    <article className='calendar'>
      <Calendar
        onChange={onChange}
        onActiveStartDateChange={onMonthChange}
        tileClassName={styleTiles}
        onViewChange={onViewChange}

        value={date}
        view={view}

        minDate={TODAY}
        maxDate={NEXT_YEAR}
        showNeighboringMonth={false}
      />

      {displayer(view, date, events, status)}
    </article>
  );
}

export default BBCalendar;
