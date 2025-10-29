import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterDropdowns from "./components/FilterDropdowns";
import RecipeCard from "./components/RecipeCard";
import "./App.css";

export default function RecipeIdeas() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  

  const fetchRecipes = async () => {
    if (!query && !cuisine && !category) {
      alert("Please enter a search term or select filters!");
      return;
    }

    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?";
    if (query) url += `i=${query}`;
    else if (category) url += `c=${category}`;
    else if (cuisine) url += `a=${cuisine}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };



const handleQuickMeals = async () => {
  try {
    

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(
        query || "chicken"
      )}&maxReadyTime=15&number=10&addRecipeInformation=true&apiKey=f72b249467ca4fa1b92b8c13a399b9fc`
    );

    
    const data = await response.json();

    if (Array.isArray(data.results)) {
          setRecipes(data.results);
        } else {
          console.error("Unexpected API response:", data);
          setRecipes([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching quick meals:", error);
      }
};




  return (
    <div className="app-container">
      
      <SearchBar query={query} setQuery={setQuery} onSearch={fetchRecipes} />
      <FilterDropdowns
        cuisine={cuisine}
        setCuisine={setCuisine}
        category={category}
        setCategory={setCategory}
      />
      <button onClick={handleQuickMeals} className="quick-meals-btn">
        Quick Meals
      </button>

      {recipes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>Search for recipes.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((meal) => (
            <RecipeCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}

    </div>
  );
}
