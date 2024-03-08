import React from "react";
import { useState, useEffect } from "react";
import { useCart } from "../../../App";
import "./listOfItems.css";

import { Item } from "../../../share/components/Item";

function ItemsOfDrugs({ idShop }) {
  const { cart, addToCart } = useCart();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/productsOfShop?id_shop=${idShop}`
        );
        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [idShop]);

  return (
    <>
      <div>
        {idShop == 0 && <div>Choose shop</div>}
        <ul>
          {data && (
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  <div>{item.name}</div>
                  <div className="price">{item.price}</div>
                  <button onClick={() => addToCart({ ...item, quantity: 1 })}>
                    add to cart
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </>
  );
}

export { ItemsOfDrugs };
