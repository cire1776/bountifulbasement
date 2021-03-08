import React from "react";
import Layout from "./layout";

function Protected({ children }) {
  const netlifyIdentity = require("netlify-identity-widget");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {}, [user]);

  React.useEffect(() => {
    netlifyIdentity.init({});
    netlifyIdentity.on("login", checkinUser);
    netlifyIdentity.on("logout", checkoutUser);
    setUser(netlifyIdentity.currentUser());
  }, []);

  function checkinUser(user) {
    setUser(user);
  }

  function checkoutUser() {
    setUser(null);
  }

  function loginUser(e) {
    e.preventDefault();
    netlifyIdentity.open();
  }

  if (!user) {
    return (
      <Layout>
        <section className="login">
          <h1>You must be logged in to access this page</h1>
          <button type="button" onClick={loginUser}>
            Login
          </button>
        </section>
      </Layout>
    );
  }

  return <>{children}</>;
}

export default Protected;
