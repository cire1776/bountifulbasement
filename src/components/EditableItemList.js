import React, { useState, useEffect } from "react";
import pencil from "../assets/pencil.svg";
import trashcan from "../assets/trash.svg";
import plus from "../assets/plus.svg";
import EditableItemName from "./EditableItemName";
import {
  fetchEditableItems,
  fetchSlipItems,
  fetchCategories,
  createItem,
  updateFields,
  deleteItem,
} from "./order_slip_loader";
import ModalDialog from "./ModalDialog";

function EditableItemList({ items, categories, setItems, refresher }) {
  const [editedItem, setEditedItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  function toggleStatus(id) {
    const newStatus = items[id].status === "use" ? "skip" : "use";
    items[id].status = items[id].status === "use" ? "skip" : "use";
    updateFields(id, { status: newStatus }, refresher);
  }

  function changeCategory(event, id) {
    const newCategory = event.target.value;
    updateFields(event.target.id, { category: newCategory }, refresher);
  }

  function checkDeleteItem(id) {
    setDeletingId(id);
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
      () => {
        refresher();
        setItems(items);
      }
    );
  }

  return (
    <>
      <ul className="list-of-items">
        <header key="header">
          <span>S</span>
          <span>Name</span>
          <span>Category</span>
        </header>
        {Object.keys(items).map((id) => {
          const item = items[id];
          if (id === editedItem) {
            return (
              <li key={id} className={item.status === "use" ? "used" : "skip"}>
                <input
                  type="checkbox"
                  checked={item.status === "use"}
                  onChange={() => toggleStatus(id)}
                />
                <EditableItemName
                  id={id}
                  name={item.name}
                  changeName={changeName}
                  endEditingItem={endEditingItem}
                />
              </li>
            );
          } else {
            return (
              <li key={id} className={item.status === "use" ? "used" : "skip"}>
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
                      <option key={category.category} value={category.category}>
                        {category.category}{" "}
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
            <EditableItemName endEditingItem={endEditingItem} />
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
        confirmAction={() => deleteItem(deletingId, refresher)}
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
