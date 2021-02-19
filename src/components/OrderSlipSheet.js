import React, {useState, useEffect} from 'react';
import OrderSlip from './OrderSlip';
import {fetchSlipItems, fetchCategories} from './order_slip_loader.js';

function OrderSlipSheet() {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchCategories(setCategories);
    fetchSlipItems(setItems);
  },[])

  if (Object.entries(items).length === 0 || categories.length ===0) {
    return <h1>Loading</h1>
  }

  return (
    <div className='slip-sheet'>
    <OrderSlip items={items} categories={categories} date={new Date().toLocaleDateString()}/>
    <OrderSlip items={items} categories={categories} date={new Date().toLocaleDateString()}/>
    <OrderSlip items={items} categories={categories} date={new Date().toLocaleDateString()}/>
    <OrderSlip items={items} categories={categories} date={new Date().toLocaleDateString()}/>
    <OrderSlip items={items} categories={categories} date={new Date().toLocaleDateString()}/>
    <OrderSlip items={items} categories={categories} date={new Date().toLocaleDateString()}/>
    </div>
  );
}

export default OrderSlipSheet;
