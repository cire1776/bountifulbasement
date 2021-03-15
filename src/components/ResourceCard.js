import React from "react";
import pencil from "../images/pencil.svg";
import trashcan from "../images/trash.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faHandsHelping,
  faBolt,
  faHome,
  faPrayingHands,
  faUsers,
  faGraduationCap,
  faGavel,
  faUserMd,
  faAppleAlt,
  faBalanceScale,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  Assistance: faHandsHelping,
  Community: faUsers,
  Utilities: faBolt,
  Education: faGraduationCap,
  Food: faAppleAlt,
  Housing: faHome,
  Legal: faGavel,
  Meal: faUtensils,
  Medical: faUserMd,
  Rights: faBalanceScale,
  Prayer: faPrayingHands,
};

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
  function isSelected(id) {
    return selection !== undefined && selection === id;
  }
  let classes = ["resource-card"];
  if (featured) {
    classes.push("featured");
  }

  if (isSelected(id)) {
    classes.push("selected");
  }

  return (
    <article className={classes.join(" ")}>
      <h1>{name}</h1>
      {phone} |{" "}
      {website !== "n/a" ? <a href={website}>Website</a> : "No Website"}
      <div className="icon-group">
        {tags.map((tag) => {
          return (
            <div key={tag}>
              <FontAwesomeIcon
                key={tag}
                icon={ICONS[tag] || faQuestion}
                size="2x"
              />
            </div>
          );
        })}
      </div>
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
