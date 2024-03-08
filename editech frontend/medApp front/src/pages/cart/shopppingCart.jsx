import React, { useEffect, useState } from "react";
import { DeliveryForm } from "./components/shippingForm";
import { ItemsOrderList } from "./components/itemsList";
import { useCart } from "../../App";

function ShoppingCart(props) {
  const { calculateTotalPrice, cart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calculateTotalPrice);
  }, [cart]);
  return (
    <>
      <DeliveryForm total={total}>
        <ItemsOrderList></ItemsOrderList>
      </DeliveryForm>
    </>
  );
}

export { ShoppingCart };
