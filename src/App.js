import './App.css';
import React, {useState, useEffect} from 'react';
import OrderSlip from './components/OrderSlip';


console.log(process.env.REACT_APP_AIRTABLE_API_KEY);

function App() {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([]);

  async function fetchSlipItems() {
    const Airtable = require('airtable-node');

    console.log(process.env);

    const airtable = await new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
      .base('appPJGWfywLNUoPkg')
      .table('order-slip-data');

    const {records} = await airtable.list()
    const newItems = records.reduce((accum, record)=>{
      const category = record.fields.category;
      
      if (!(category in accum)) {
        accum[category]=[];
      }

      accum[category].push(record.fields.item)
      return accum;

    },{})

    setItems(newItems);
  }

  async function fetchCategories() {
    const Airtable = require('airtable-node');

    const airtable = await new Airtable({ apiKey: 'keyrXrvJEWWLSjTU2' })
          .base('appPJGWfywLNUoPkg')
          .table('order-slip-categories');

    const {records: category_records} = await airtable.list({
      sort: [{ field: 'sequence', direction: 'asc' }],
    });

    const newCategories = category_records.map((record)=> {
      return record.fields.category;
    })
    setCategories(newCategories)
  }

  useEffect(()=>{
    fetchCategories();
    fetchSlipItems();
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

export default App;
