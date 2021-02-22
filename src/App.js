import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import OrderSlipSheet from './pages/OrderSlipSheet'
import OrderSlipEditor from './pages/OrderSlipEditor'
import BBCalendar from './pages/BBCalendar'
import CalendarEditor from './pages/CalendarEditor'
import Home from './pages/Home'

function App() {
    return (
        <Router>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/orderslips">
                <OrderSlipSheet />
            </Route>
            <Route path="/orderslips/editor">
                <OrderSlipEditor />
            </Route>
            <Route exact path="/calendar">
                <BBCalendar />
            </Route>
            <Route path="/calendar/Editor">
                <CalendarEditor />
            </Route>

        </Router>
    )
}

export default App
