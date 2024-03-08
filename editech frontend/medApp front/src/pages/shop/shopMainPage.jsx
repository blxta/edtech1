import React from "react";
import { useState } from "react";
import { ShopsList } from "./components/Shops";
import { ItemsOfDrugs } from "./components/ListOfItems";
import "./shopMainPage.css";

function MainShopPage() {
  const [count, setCount] = useState(0);
  const [idShop, setIdShop] = useState(0);

  return (
    <>
      <div className="container">
        <div className="shopsList">
          <ShopsList setIdShop={setIdShop}></ShopsList>
        </div>
        <div className="itemsOfDrugs">
          <ItemsOfDrugs idShop={idShop}></ItemsOfDrugs>
        </div>
      </div>
    </>
  );
}

export { MainShopPage };
