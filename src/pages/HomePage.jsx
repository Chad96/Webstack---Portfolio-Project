import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("http://localhost:5000/recipes");
      setRecipes(response.data);
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
