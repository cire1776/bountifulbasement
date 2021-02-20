import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import OrderSlipSheet from './pages/OrderSlipSheet'
import OrderSlipEditor from './pages/OrderSlipEditor'
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
        </Router>
    )
}

export default App
