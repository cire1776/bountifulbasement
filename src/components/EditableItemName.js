import React, {useEffect} from 'react'


function EditableItemName({id, name, changeName, endEditingItem}) {
    const editFieldRef = React.useRef();
    const originalValue = React.useRef(name);

    function handleKey(event) {
        if (event.code === 'Escape') {
            endEditingItem(originalValue.current);
        } else if (event.code === 'Enter') {
            endEditingItem(event.target.value);
        }
    }

    useEffect(()=>{
        editFieldRef.current.focus();
    })

    return (
        <input type='text' defaultValue={name} onKeyUp={handleKey} ref={editFieldRef} onChange={(event)=>{
            changeName && changeName(id, event.target.value)}} onBlur={(event) => endEditingItem(event.target.value)
                                }></input>
    )
}

export default EditableItemName
