import React from "react";
import { Item } from "../../../share/components/Item";
import { useCart } from "../../../App";

function ItemsOrderList() {
  const { cart, addToCart, decrementFromCart } = useCart();
  return (
    <>
      <ul>
        {cart.length <= 0 && <p className="emptyCart">Cart is empty</p>}
        {cart.map((item) => (
          <li key={item.id}>
            {item.itemName},price = {item.price * item.quantity}
            <div>
              <button onClick={() => decrementFromCart({ ...item })}>-</button>
              <input type="number" value={item.quantity} />
              <button onClick={() => addToCart({ ...item, quantity: 1 })}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export { ItemsOrderList };
