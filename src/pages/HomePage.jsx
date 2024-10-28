import React, { useEffect, useState } from 'react';
import './HomePage.css';  

const HomePage = () => {
  // State variables for recipes, pagination, and error handling
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  // Function to fetch recipes with pagination
  const fetchRecipes = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setRecipes(data.recipes);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        throw new Error("Received non-JSON response from server");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Could not load recipes. Please try again later.");
    }
  };

  // Fetch recipes when component mounts and when `currentPage` changes
  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      {error && <p className="error">Error fetching recipes: {error}</p>}
      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <h2>{recipe.name}</h2>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
              <p><strong>Ingredients:</strong></p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No recipes found.</p>
      )}
      
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
