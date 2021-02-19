import React from 'react';
import "./OrderSlip.css";

function OrderSlip({items, categories, date}) {
    const header = <header>
            <p>Last _______________________ First ______________________</p>
            <p># _______ # in Family ___________</p>
            <p>☐ Walking ☐ Cart ☐ Bags ☐ No Pork</p>            
        </header>

    if (Object.keys(items).length ===0 || categories.length===0) {
       return <h1>Loading...</h1>
    }

    return <article className='order-slip'>
        {header}

        {
            categories.map((category)=>{
                return <section key={category}>
                    <h1>{category}</h1>
                    <div className='item-list'>
                        <ul>
                        {
                            items[category].map((item) => {
                        return (
                            <li key={item}>___{item}</li>
                        )
                            })
                        }
                        </ul>
                    </div>
                </section>
            })
        }
        <footer>
            {date}
        </footer>
    </article>
}

export default OrderSlip
