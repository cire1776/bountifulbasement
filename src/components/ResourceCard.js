import React from "react";
import pencil from "../images/pencil.svg";
import trashcan from "../images/trash.svg";

function ResourceCard({
  id,
  name,
  phone,
  tags,
  website,
  featured,
  forEditor,
  selection,
  editor,
  deleter,
}) {
  let classes = [];
  if (featured) {
    classes.push("featured");
  }

  if (selection !== undefined && selection === id) {
    classes.push("selected");
  }

  return (
    <article className={classes.join(" ")}>
      <h1>{name}</h1>
      {phone} |{" "}
      {website !== "n/a" ? <a href={website}>Website</a> : "No Website"}
      <p>{tags.join(", ")}</p>
      {forEditor && (
        <div className="control-group">
          <img src={pencil} alt="edit" onClick={(event) => editor(id)} />
          <img src={trashcan} alt="trashcan" onClick={(event) => deleter(id)} />
        </div>
      )}
    </article>
  );
}

export default ResourceCard;
