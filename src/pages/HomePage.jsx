import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const fetchRecipes = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes?page=${page}&limit=10`);
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

  const handleEdit = (recipe) => {
    setIsEditing(true);
    setCurrentRecipe(recipe);
  };

  const handleDelete = async (recipeId) => {
    try {
      await fetch(`http://localhost:5000/recipes/${recipeId}`, { method: 'DELETE' });
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setError("Could not delete recipe. Please try again later.");
    }
  };

  const handleUpdate = async (updatedRecipe) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${updatedRecipe._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });
      if (response.ok) {
        setRecipes(recipes.map(recipe => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe)));
        setIsEditing(false);
        setCurrentRecipe(null);
      } else throw new Error("Failed to update recipe.");
    } catch (err) {
      console.error("Error updating recipe:", err);
      setError("Could not update recipe. Please try again later.");
    }
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
                <p><strong>Ingredients:</strong></p>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
              </div>
              <div className="recipe-actions">
                <button onClick={() => handleEdit(recipe)}>Edit</button>
                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          !error && <p>No recipes found.</p>
        )}
      </div>

      {/* Edit Form */}
      {isEditing && currentRecipe && (
        <div className="edit-form">
          <h2>Edit Recipe</h2>
          <label>Name: <input type="text" value={currentRecipe.name} onChange={(e) => setCurrentRecipe({ ...currentRecipe, name: e.target.value })} /></label>
          <label>Cooking Time: <input type="number" value={currentRecipe.cookingTime} onChange={(e) => setCurrentRecipe({ ...currentRecipe, cookingTime: e.target.value })} /></label>
          <label>Difficulty: <input type="text" value={currentRecipe.difficulty} onChange={(e) => setCurrentRecipe({ ...currentRecipe, difficulty: e.target.value })} /></label>
          <label>Ingredients: <input type="text" value={currentRecipe.ingredients.join(', ')} onChange={(e) => setCurrentRecipe({ ...currentRecipe, ingredients: e.target.value.split(', ') })} /></label>
          <label>Instructions: <textarea value={currentRecipe.instructions} onChange={(e) => setCurrentRecipe({ ...currentRecipe, instructions: e.target.value })}></textarea></label>
          <button onClick={() => handleUpdate(currentRecipe)}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
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
