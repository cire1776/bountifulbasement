import React from 'react'
const Airtable = require('airtable-node');

async function fetchAlertMessages(cb) {
    const airtable = await new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
        .base('appPJGWfywLNUoPkg')
        .table('alert-messages');

        const {records} = await airtable.list();

        const messages = records.map((message)=> {
            return message.fields;
        });

        if (cb) {
            console.log(messages);
            cb(messages);
        }

}

function AlertBar() {
    const [message, setMessage] = React.useState(null);

    React.useEffect(()=>{
        fetchAlertMessages((messages)=>{
            setMessage(messages[0]);
        })
    },[])


    return (
        <h1 className='alertbar'>
            {message && message['alert-message']}
        </h1>
    )
}

export default AlertBar
