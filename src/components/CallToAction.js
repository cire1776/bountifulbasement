import React from "react";
import { navigate } from "gatsby";

function CallToAction() {
  return (
    <section className="cta">
      <button type="button">Donate</button>
      <button type="button">Volunteer</button>
      <button type="button" onClick={() => navigate("/need-food/")}>
        Need Food?
      </button>
    </section>
  );
}

export default CallToAction;
