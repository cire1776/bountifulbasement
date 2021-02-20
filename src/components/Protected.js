import React from 'react'
import netlifyIdentity from 'netlify-identity-widget';


function Protected({children}) {
    const [user, setUser] = React.useState(netlifyIdentity.currentUser());
    
    React.useEffect(()=>{
    
    },[user]);

    function checkinUser(user) {
        setUser(user)
        console.log(user);
    }

    function checkoutUser() {
        setUser(null)
        console.log(user);
    }

    netlifyIdentity.on('login', checkinUser);
    netlifyIdentity.on('logout', checkoutUser);

    console.log(user);
    if (!user) {
        return  <section>
                    <h1>You must be logged in to access this page</h1>
                    <button onClick={()=>netlifyIdentity.open()}>Login</button>
                </section>
    }

    return (
        <>
            {children}
        </>
    )
}

export default Protected
