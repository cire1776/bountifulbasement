import React, { useEffect, useState } from "react";
import "./editor.css";
import {
  fetchEditableItems,
  fetchSlipItems,
  fetchCategories,
  createItem,
  updateFields,
  deleteItem,
} from "../../components/order_slip_loader";

import Protected from "../../components/Protected";
import MainHeader from "../../components/MainHeader";
import OrderSlip from "../../components/OrderSlip";
import EditableItemList from "../../components/EditableItemList";

function OrderSlipEditor() {
  const [orderSlipItems, setOrderSlipItems] = useState({});
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchSlipItems(setOrderSlipItems);
    fetchCategories(setCategories);
    fetchEditableItems(setItems);
  }, [count]);

  useEffect(() => {}, [orderSlipItems]);

  if (items.length === 0 || categories.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <Protected>
      <MainHeader />
      <main>
        <section className="orderslip-editor">
          <OrderSlip items={orderSlipItems} categories={categories} />
          <EditableItemList
            items={items}
            categories={categories}
            setItems={setItems}
            refresher={() => setCount((c) => c + 1)}
          />
        </section>
      </main>
    </Protected>
  );
}

export default OrderSlipEditor;
