import React from "react";
import RecipeIdeas from "./RecipeIdeas";
import "./App.css";
import logo from "./pantryPal.png";

export default function App() {
  return (
    <div className="app">
      <div className="logo-about">
        <img src={logo} alt="PantryPal Logo" className="logo" />
          <div className="text-container">
            <p className="about-text">
              Cook smart with what you have at home. Find quick recipes by ingredients, mood, or cuisine!
            </p>
          </div>
        </div>
        
      <section>
        <RecipeIdeas />
      </section>

    
    </div>
  );
}
