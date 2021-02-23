import React, { useState, useEffect } from "react";
import pencil from "../assets/pencil.svg";
import trashcan from "../assets/trash.svg";
import plus from "../assets/plus.svg";
import EditableText from "./EditableText";
import {
  fetchEditableItems,
  fetchSlipItems,
  fetchCategories,
  createItem,
  updateFields,
  deleteItem,
} from "./order_slip_loader";
import ModalDialog from "./ModalDialog";

const REMAINDER_RANGE = [" "];
for (let c = 1; c <= 12; c++) {
  REMAINDER_RANGE.push(c.toString());
}

function EditableItemList({ items, categories, setItems, refresher }) {
  const [editedItem, setEditedItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [index, setIndex] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  useEffect(() => {
    let newIndex = [...index];

    if (newIndex.length === 0) {
      newIndex = Object.keys(items);
    } else {
      for (const key in items) {
        if (newIndex.includes(key)) {
          continue;
        }
        newIndex.push(key);
      }
    }

    newIndex = sort(newIndex);
    setIndex(newIndex);
  }, [items, sortDirection, sortCriteria]);

  useEffect(() => {}, []);

  function sort(index) {
    function compareStatus(a, b) {
      if (items[a].status > items[b].status) {
        return -1;
      }

      if (items[a].status < items[b].status) {
        return 1;
      }
      return 0;
    }

    function compareName(a, b) {
      if (items[a].name < items[b].name) {
        return -1;
      }

      if (items[a].name > items[b].name) {
        return 1;
      }
      return 0;
    }

    function compareCategory(a, b) {
      if (items[a].category < items[b].category) {
        return -1;
      }

      if (items[a].category > items[b].category) {
        return 1;
      }
      return 0;
    }

    function compareCreatedTime(a, b) {
      if (items[a].createdTime > items[b].createdTime) {
        return -1;
      }

      if (items[a].createdTime < items[b].createdTime) {
        return 1;
      }
      return 0;
    }

    const compareFuncs = {
      status: compareStatus,
      name: compareName,
      category: compareCategory,
      createdTime: compareCreatedTime,
    };

    let specifiedCriteria = sortCriteria || "createdTime";

    return sortDirection === "asc"
      ? index.sort(compareFuncs[specifiedCriteria])
      : index.sort((a, b) => -compareFuncs[specifiedCriteria](a, b));
  }

  function toggleStatus(id) {
    const newStatus = items[id].status === "use" ? "skip" : "use";
    items[id].status = items[id].status === "use" ? "skip" : "use";
    updateFields(id, { status: newStatus }, refresher);
  }

  function changeCategory(event, id) {
    const newCategory = event.target.value;
    updateFields(id, { category: newCategory }, refresher);
  }

  function changeRemainder(event, id) {
    let newRemainder = event.target.value;
    if (newRemainder === " ") {
      newRemainder = "";
    }
    updateFields(id, { remainder: newRemainder }, refresher);
  }

  function checkDeleteItem(id) {
    setDeletingId(id);
  }

  function handleDeletion() {
    const newIndex = index.filter((id) => id !== deletingId);
    setIndex(newIndex);
    deleteItem(deletingId, refresher);
  }

  function beginEditingItem(id) {
    setEditedItem(id);
  }

  function endEditingItem(finalName) {
    if (editedItem === 0) {
      addItem(finalName);
    } else {
      changeName(editedItem, finalName);
    }
    refresher();
    setEditedItem(null);
  }

  function changeName(id, newName) {
    newName = newName.trim();

    if (newName === "") {
      return;
    }

    const item = items[id];
    const newItem = { ...item, item: newName };
    const newItems = (items[id] = newItem);
    updateFields(id, { item: newName }, () => {
      refresher();
      setItems(items);
    });
  }

  function addItem(newName) {
    if (!newName) {
      return;
    }

    newName = newName.trim();

    if (newName === "") {
      return;
    }
    createItem(
      {
        fields: {
          item: newName,
          status: "use",
          category: "meat",
        },
      },
      ({ id }) => {
        const newIndex = [...index, id];
        setIndex(newIndex);
        setItems(items);
        refresher();
      }
    );
  }

  function sortDecorator(criteria) {
    if (criteria !== sortCriteria) {
      return "";
    }

    if (sortDirection === "asc") {
      return "↑";
    }

    return "↓";
  }

  function toggleSearch(criteria) {
    if (sortCriteria !== criteria) {
      setSortCriteria(criteria);
      setSortDirection("asc");
    } else {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortCriteria(null);
        setSortDirection(null);
      }
    }
  }

  return (
    <>
      <ul className="list-of-items">
        <header key="header">
          <span onClick={() => toggleSearch("status")}>
            S {sortDecorator("status")}
          </span>
          <span onClick={() => toggleSearch("name")}>
            Name {sortDecorator("name")}
          </span>
          <span onClick={() => toggleSearch("category")}>
            Category {sortDecorator("category")}
          </span>
          <span>Left</span>
        </header>
        {index
          .filter((id) => !!items[id])
          .map((id) => {
            const item = items[id];

            if (id === editedItem) {
              return (
                <li
                  key={id}
                  className={item.status === "use" ? "used" : "skip"}
                >
                  <input
                    type="checkbox"
                    checked={item.status === "use"}
                    onChange={() => toggleStatus(id)}
                  />
                  <EditableText
                    id={id}
                    text={item.name}
                    changeProc={changeName}
                    endEditingItem={endEditingItem}
                  />
                </li>
              );
            } else {
              return (
                <li
                  key={id}
                  className={item.status === "use" ? "used" : "skip"}
                >
                  <input
                    type="checkbox"
                    checked={item.status === "use"}
                    onChange={() => toggleStatus(id)}
                  />
                  <h2>{item.name}</h2>
                  <select
                    name={id}
                    id={id}
                    value={item.category}
                    onChange={(event) => changeCategory(event, id)}
                  >
                    {categories.map((category) => {
                      return (
                        <option
                          key={category.category}
                          value={category.category}
                        >
                          {category.category}{" "}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="remainder"
                    name={`remainder_${id}`}
                    id={`remainder_${id}`}
                    value={item.remainder ? item.remainder : " "}
                    onChange={(event) => changeRemainder(event, id)}
                  >
                    {REMAINDER_RANGE.map((remainder) => {
                      return (
                        <option key={remainder} value={remainder}>
                          {remainder}
                        </option>
                      );
                    })}
                  </select>
                  <img
                    src={pencil}
                    alt="edit"
                    onClick={(event) => beginEditingItem(id)}
                  />
                  <img
                    src={trashcan}
                    alt="trashcan"
                    onClick={(event) => {
                      checkDeleteItem(id);
                    }}
                  />
                </li>
              );
            }
          })}
        {editedItem === 0 ? (
          <li key={0}>
            <div></div>
            <EditableText endEditingItem={endEditingItem} />
          </li>
        ) : (
          <button
            key="button"
            type="button"
            onClick={(event) => beginEditingItem(0)}
          >
            <img src={plus} alt="add" />{" "}
          </button>
        )}
      </ul>
      <ModalDialog
        activate={!!deletingId}
        confirmTitle="Delete"
        confirmAction={() => handleDeletion(deletingId)}
        dismiss={() => setDeletingId(null)}
      >
        <h1>
          Are you sure you want to delete '
          {deletingId && items[deletingId].name}'?
        </h1>
      </ModalDialog>
    </>
  );
}

export default EditableItemList;
