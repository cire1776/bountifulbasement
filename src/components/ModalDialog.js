import React from 'react'

function ModalDialog({activate, children, confirmTitle, confirmAction, dismiss}) {
    function handleConfirm() {
        confirmAction();
        dismiss();
    }

    if (!activate) {
        return null;
    }

    return (
        <div className="backdrop">
            <section className='modal-dialog'>
                {children}
                <footer>
                    <button onClick={()=>dismiss()} >Cancel</button>
                    <button type='button' onClick={handleConfirm}>{confirmTitle ? confirmTitle : 'Ok'}</button>
                </footer>
            </section>
        </div>
    )
}

export default ModalDialog
