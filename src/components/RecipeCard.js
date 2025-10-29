import React from "react";
import "../App.css";

export default function RecipeCard({ meal }) {
  return (
    <div className="recipe-card">
      <img src={meal.image || meal.strMealThumb} alt={meal.title || meal.strMeal} />
      <h3>{meal.title || meal.strMeal}</h3>
      {meal.readyInMinutes && <p>⏱️ {meal.readyInMinutes} mins</p>}
    </div>
  );
}
