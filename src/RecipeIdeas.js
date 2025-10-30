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

    try{

      let ingredientMeals = [];
      let categoryMeals = [];
      let cuisineMeals = [];

      if(query) {
        const ingredients = query.split(",").map(i => i.trim());

        let ingResList = [];

        for (const ingredient of ingredients){
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
          const data = await res.json();
          if (data.meals) {
            if (ingResList.length === 0) {
              ingResList = data.meals;
            } else {
              // Keep only common meals across ingredients
              ingResList = ingResList.filter(m1 =>
                data.meals.some(m2 => m2.idMeal === m1.idMeal)
              );
            }
              
          }
        }

      
        ingredientMeals = ingResList;
      }
      if(category)  {
        
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await res.json();
        categoryMeals = data.meals || [];
      }
      if(cuisine){
        
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
        const data = await res.json();
        cuisineMeals = data.meals || [];
      } 

      let finalMeals = [];

      finalMeals = ingredientMeals.length ? ingredientMeals 
                : categoryMeals.length ? categoryMeals
                : cuisineMeals;

    // Filter step-by-step intersection
    if (ingredientMeals.length) {
      finalMeals = finalMeals.filter(m1 =>
        ingredientMeals.some(m2 => m2.idMeal === m1.idMeal)
      );
    }

    if (categoryMeals.length) {
      finalMeals = finalMeals.filter(m1 =>
        categoryMeals.some(m2 => m2.idMeal === m1.idMeal)
      );
    }

    if (cuisineMeals.length) {
      finalMeals = finalMeals.filter(m1 =>
        cuisineMeals.some(m2 => m2.idMeal === m1.idMeal)
      );
    }

    setRecipes(finalMeals);
    }catch (error) {
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
