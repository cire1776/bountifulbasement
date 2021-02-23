import React from "react";
import "./OrderSlip.css";

function OrderSlip({ items, categories, date }) {
  function remainder(item) {
    let remainder = item.remainder;

    if (remainder) {
      return `(${remainder})`;
    }
    return "";
  }

  const header = (
    <header>
      <p>Last _______________________ First ______________________</p>
      <p># _______ # in Family ___________</p>
      <p>☐ Walking ☐ Cart ☐ Bags ☐ No Pork</p>
    </header>
  );

  if (Object.keys(items).length === 0 || categories.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <article className="order-slip">
      {header}

      {categories.map((category) => {
        const { category: name, has_none } = category;

        return (
          <section key={name}>
            <h1>{name}</h1>
            <ul className="item-list">
              {has_none && <li key={`none_${name}`}>___None</li>}
              {items[name].map((item) => {
                const { name: itemName } = item;
                return (
                  <li key={itemName}>
                    ___{itemName}
                    {remainder(item)}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      <footer>{date}</footer>
    </article>
  );
}

export default OrderSlip;
