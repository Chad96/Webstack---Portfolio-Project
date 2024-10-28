import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRecipes = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes?page=${page}&limit=4`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setRecipes(data.recipes);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else throw new Error("Received non-JSON response from server");
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Could not load recipes. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const viewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div>
      <h1>Recipes</h1>
      {error && <p className="error">Error fetching recipes: {error}</p>}
      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div className="recipe-card" key={recipe._id}>
              <img src={recipe.imageUrl || 'default-image.jpg'} alt={recipe.name} className="recipe-image" />
              <div className="recipe-details">
                <h2>{recipe.name}</h2>
                <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
              </div>
              <div className="recipe-actions">
                <button onClick={() => viewRecipe(recipe._id)}>View Recipe</button>
              </div>
            </div>
          ))
        ) : (
          !error && <p>No recipes found.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
