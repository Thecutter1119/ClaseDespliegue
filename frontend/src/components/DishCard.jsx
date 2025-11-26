import React from "react";

export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <h3>{dish.name}</h3>
      <p>Precio: ${dish.price}</p>
    </div>
  );
}
