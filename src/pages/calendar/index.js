import React from "react";
import BBCalendar from "../../components/BBCalendar";
import Layout from "../../components/layout";

function Index() {
  return (
    <Layout classname="calendar-wrapper" title="Calender">
      <BBCalendar />;
    </Layout>
  );
}

export default Index;
