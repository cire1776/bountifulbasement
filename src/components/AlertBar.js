import React from "react";
const Airtable = require("airtable-node");

async function fetchAlertMessages(cb) {
  const airtable = await new Airtable({
    apiKey: process.env.AIRTABLE_PAT,
  })
    .base("appPJGWfywLNUoPkg")
    .table("alert-messages");

  const { records } = await airtable.list();

  const messages = records.map((message) => {
    return message.fields;
  });

  if (cb) {
    cb(messages);
  }
}

function AlertBar() {
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    fetchAlertMessages((messages) => {
      setMessage(messages[0]);
    });
  }, []);

  return (
    <aside className="alertbar">
      <h1>{message && message["alert-message"]}</h1>
    </aside>
  );
}

export default AlertBar;
