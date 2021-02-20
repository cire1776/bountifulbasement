import React, {useEffect,useState} from 'react'
import {fetchEditableItems, fetchSlipItems,fetchCategories, createItem, updateFields, deleteItem} from './order_slip_loader';
import pencil from '../assets/pencil.svg';
import trashcan from '../assets/trash.svg'
import plus from '../assets/plus.svg';

import Protected from './Protected';
import MainHeader from './MainHeader';
import OrderSlip from './OrderSlip';
import ModalDialog from './ModalDialog';
import EditableItemName from './EditableItemName';


function OrderSlipEditor() {
    const [orderSlipItems, setOrderSlipItems] = useState({});
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editedItem, setEditedItem] = useState(null)
    const [count, setCount] = useState(0);
    const [deletingId, setDeletingId] = useState(null);
    
    useEffect(() => {
        fetchSlipItems(setOrderSlipItems);
        fetchCategories(setCategories);
        fetchEditableItems(setItems);
    }, [count])

    useEffect(()=>{
    },[orderSlipItems])

    useEffect(() => {
    }, [items])

    
    function toggleStatus(id) {
        const newStatus = items[id].status === 'use' ? 'skip' : 'use';
        items[id].status = items[id].status === 'use' ? 'skip' : 'use';
        updateFields(id, {status: newStatus},()=>setCount((count)=> count + 1));
        
    }

    function changeCategory(event, id) {
        const newCategory = event.target.value;
        updateFields(event.target.id, {category: newCategory}, ()=> setCount((count)=> count + 1));
    }

    function checkDeleteItem(id) {
        setDeletingId(id);
    }


    function changeName(id, newName) {
        newName = newName.trim();

        if (newName === "") {
            return
        }

        const item = items[id];
        const newItem = {...item, item: newName};
        const newItems = items[id] = newItem;
        updateFields(id, {item: newName},()=>{
            setCount((count)=> count + 1)
            setItems(items);
        });
        
    }

    function addItem(newName) {
        if (!newName) {
            return;
        }

        newName = newName.trim();

        if (newName === "") {
            return
        }
        createItem({fields: {
                            item: newName,
                            status: 'use',
                            }},()=>{
            setCount((count)=> count + 1)
        });
    }

    function beginEditingItem(id) {
        setEditedItem(id);

    }

    function endEditingItem(finalName) {
        if (editedItem === 0) {
            addItem(finalName);
        } else  {
            changeName(editedItem, finalName);
        }

        setEditedItem(null)
    }

    if(items.length === 0 || categories.length === 0) {
        return <h1>Loading...</h1>
    }
    return (<Protected> 
        <MainHeader />
        <main>
        <div className='editor'>
            <OrderSlip items={orderSlipItems} categories={categories}/>
            <ul className='list-of-items'>
                <header>
                    <span>S</span>
                    <span>Name</span>
                    <span>Category</span>
                </header>
            {
                Object.keys(items).map((id)=> {
                    const item = items[id];
                    if (id===editedItem) {
                        return <li key={id} className={item.status === "use" ? 'used': 'skip'}>
                                    <input type='checkbox' checked={item.status === 'use'} onChange={()=>toggleStatus(id)}/>
                                    <EditableItemName id={id} name={item.name} changeName={changeName} endEditingItem={endEditingItem}/>
                               </li>
                    } else {
                        return <li key={id} className={item.status === "use" ? 'used': 'skip'}>
                                    <input type='checkbox' checked={item.status === 'use'} onChange={()=>toggleStatus(id)}/>
                                    <h2>{item.name}</h2>
                                    <select name={id} id={id} value={item.category} onChange={(event)=>changeCategory(event, id)}>
                                        {
                                            categories.map((category) => { 
                                                return <option value={category}>{category} </option>
                                            })
                                        }
                                    </select>
                                    <img src={pencil} alt="edit" onClick={(event)=>beginEditingItem(id)}/>
                                    <img src={trashcan} alt="trashcan" onClick={(event)=>{ checkDeleteItem(id) }}/>
                               </li>
                    }
                })

            }
            {
                (editedItem === 0) ? <li>
                    <div></div><EditableItemName id={0} endEditingItem={endEditingItem}/>
                </li>
                : <button type='button' onClick={(event)=>beginEditingItem(0)}><img src={plus} alt="add"/> </button>
            }
                
                
            </ul>

        </div>
        <ModalDialog activate={!!deletingId} confirmTitle="Delete" confirmAction={()=>deleteItem(deletingId, ()=>setCount((count)=> count + 1))} dismiss={()=>setDeletingId(null)}>
            <h1>Are you sure you want to delete '{deletingId && items[deletingId].name}'?
            </h1>
        </ModalDialog>
    </main>
    </Protected>)
}

export default OrderSlipEditor
