import React, {useEffect,useState} from 'react'
import {fetchEditableItems, fetchSlipItems,fetchCategories, createItem, updateFields, deleteItem} from './order_slip_loader';

import Protected from './Protected';
import MainHeader from './MainHeader';
import OrderSlip from './OrderSlip';
import EditableItemList from './EditableItemList';


function OrderSlipEditor() {
    const [orderSlipItems, setOrderSlipItems] = useState({});
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchSlipItems(setOrderSlipItems);
        fetchCategories(setCategories);
        fetchEditableItems(setItems);
    }, [count])

    useEffect(()=>{
    },[orderSlipItems])

    useEffect(() => {
    }, [items])

    if(items.length === 0 || categories.length === 0) {
        return <h1>Loading...</h1>
    }
    return (
        <Protected> 
            <MainHeader />
            <main>
                <section className='editor'>
                    <OrderSlip items={orderSlipItems} categories={categories}/>
                    <EditableItemList items={items} categories={categories} setItems={setItems} refresher={()=>setCount((c)=>c+1)}/>
                </section>
            </main>
        </Protected>)
}

export default OrderSlipEditor
