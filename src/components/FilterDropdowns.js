import React from "react";
import "./FilterDropdowns.css";

export default function FilterDropdowns({ cuisine, setCuisine, category, setCategory }) {
  return (
    <div className="filters">
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        style={{ color: cuisine ? "black" : "gray" }}>
        <option value="">Cuisine</option>
        <option value="Indian">Indian</option>
        <option value="Italian">Italian</option>
        <option value="Chinese">Chinese</option>
        <option value="Mexican">Mexican</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ color: category ? "black" : "gray" }}>
        <option value="">Category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Seafood">Seafood</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}
