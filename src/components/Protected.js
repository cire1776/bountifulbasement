import React from "react";

function Protected({ children }) {
  const netlifyIdentity = require("netlify-identity-widget");
  const [user, setUser] = React.useState(netlifyIdentity.currentUser());

  React.useEffect(() => {}, [user]);

  React.useEffect(() => {
    netlifyIdentity.init({});
    netlifyIdentity.on("login", checkinUser);
    netlifyIdentity.on("logout", checkoutUser);
  }, []);

  function checkinUser(user) {
    setUser(user);
  }

  function checkoutUser() {
    setUser(null);
  }

  if (!user) {
    return (
      <section>
        <h1>You must be logged in to access this page</h1>
        <button onClick={() => netlifyIdentity.open()}>Login</button>
      </section>
    );
  }

  return <>{children}</>;
}

export default Protected;
