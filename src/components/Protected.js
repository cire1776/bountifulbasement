import React from "react";

function Protected({ children }) {
  const netlifyIdentity = require("netlify-identity-widget");
  netlifyIdentity.init({});
  const [user, setUser] = React.useState(netlifyIdentity.currentUser());
  netlifyIdentity.on("login", checkinUser);
  netlifyIdentity.on("logout", checkoutUser);

  React.useEffect(() => {}, [user]);

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
