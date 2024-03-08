import React from "react";
import { useState, useEffect } from "react";
import "./Shops.css";

function ShopsList({ setIdShop }) {
  const [id, setId] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/shops");
        if (!response.ok) {
          throw new Error("Error!");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <button key={item.id} onClick={() => setIdShop(item.id)}>
              <li>{item.name}</li>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export { ShopsList };
