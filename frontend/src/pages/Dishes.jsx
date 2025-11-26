import React, { useEffect, useState } from "react";
import DishCard from "../components/DishCard.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function fetchDishes() {
      try {
        const res = await fetch(`${API_URL}/api/dishes`);
        const data = await res.json();
        setDishes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando platos:", err);
      }
    }
    fetchDishes();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/dishes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: parseFloat(price) }),
      });

      if (!res.ok) {
        throw new Error("Error creando plato");
      }

      const newDish = await res.json();
      setDishes([...dishes, newDish]);
      setName("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("No se pudo crear el plato");
    }
  }

  return (
    <div className="page">
      <h2>Lista de Platos</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nombre del plato"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="dish-list">
        {dishes.map((dish) => (
          <DishCard key={dish.id ?? `${dish.name}-${dish.price}`} dish={dish} />
        ))}
      </div>
    </div>
  );
}
