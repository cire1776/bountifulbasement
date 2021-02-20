import React, { useState } from 'react';
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

function BBCalendar({displayer}) {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('normally-closed')
  const [month, setMonth] = useState("");
  const [monthEvents, setMonthEvents] = useState(null)
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
  const displaySchedule = (view, date, events, status) => {
    switch (view) {
      case 'month':
        return <DaySchedule date={date} events={events} status={status}/>
      case 'year':
        return <MonthSchedule date={date} events={events} status={status}/>
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
          
  React.useEffect(() =>{
      fetchMonthsEvents(date,setMonthEvents);
  },[date, month])

  React.useEffect(() => {
      setStatus(determineStatus(date))
  },[date,monthEvents])

  const events = determineEvents(view,date,monthEvents);

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
