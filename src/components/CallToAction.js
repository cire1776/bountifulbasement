import React from "react";
import { navigate } from "gatsby";

function CallToAction() {
  return (
    <section className="cta">
      <button type="button" onClick={() => navigate("/difference/donate/")}>
        Donate
      </button>
      <button type="button" onClick={() => navigate("/difference/volunteer")}>
        Volunteer
      </button>
      <button type="button" onClick={() => navigate("/need-food/")}>
        Need Food?
      </button>
    </section>
  );
}

export default CallToAction;
