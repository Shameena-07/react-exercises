import React from "react";
import "./RecipeCard.css";

export default function RecipeCard({ meal }) {
  let recipeLink = "#";

  if (meal.idMeal) {
    // TheMealDB recipe
    recipeLink = `https://www.themealdb.com/meal/${meal.idMeal}`;
  } else if (meal.sourceUrl) {
    // Spoonacular recipe
    recipeLink = meal.sourceUrl;
  } else if (meal.id) {
    // Fallback for Spoonacular (some responses use 'id' but no 'sourceUrl')
    recipeLink = `https://spoonacular.com/recipes/${meal.title
      ?.toLowerCase()
      .replace(/ /g, "-")}-${meal.id}`;
  }
  return (
    <div className="recipe-card">
        <img src={meal.image || meal.strMealThumb} alt={meal.title || meal.strMeal} />
        <h3>{meal.title || meal.strMeal}</h3>
        {/* {meal.readyInMinutes && <p>⏱️ {meal.readyInMinutes} mins</p>} */}
        
	<a
              href={recipeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>




    </div>
  );
}
