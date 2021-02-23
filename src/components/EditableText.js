import React, { useEffect } from "react";

function EditableText({ id, text, changeProc, endEditingItem }) {
  const editFieldRef = React.useRef();
  const originalValue = React.useRef(text);

  function handleKey(event) {
    if (event.code === "Escape") {
      endEditingItem(originalValue.current);
    } else if (event.code === "Enter" || event.code === "NumpadEnter") {
      endEditingItem(event.target.value);
    }
  }

  useEffect(() => {
    editFieldRef.current.focus();
  });

  return (
    <input
      type="text"
      defaultValue={text}
      onKeyUp={handleKey}
      ref={editFieldRef}
      onChange={(event) => {
        changeProc && changeProc(id, event.target.value);
      }}
      onBlur={(event) => endEditingItem(event.target.value)}
    ></input>
  );
}

export default EditableText;
