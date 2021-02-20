import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import OrderSlipSheet from './components/OrderSlipSheet'
import OrderSlipEditor from './components/OrderSlipEditor'
function App() {
    return (
        <Router>
            <Route exact path="/">
                <h1>Website coming soon!</h1>
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
