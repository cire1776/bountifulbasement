import React from 'react'

import netlifyIdentity from 'netlify-identity-widget';
console.log (netlifyIdentity.currentUser());

function MainHeader() {
    return (
        <div>
            Bountiful Basement
            {
            netlifyIdentity.currentUser() ?
                <button type='button' onClick={()=>netlifyIdentity.logout()}>
                    Logout
                </button>
            :   <button type='button' onClick={()=>netlifyIdentity.open()}>
                    Login
                </button>
            }
        </div>
    )
}

export default MainHeader
