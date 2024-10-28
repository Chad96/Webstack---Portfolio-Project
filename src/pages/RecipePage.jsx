import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipePage = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch recipe details by ID
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle recipe update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/recipes/${id}`, recipe);
      setIsEditing(false); // Exit editing mode
      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  // Delete recipe function
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`http://localhost:5000/recipes/${id}`);
        navigate("/home"); // Redirect to home after deletion
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/src/assets/your-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <h1 className="text-center mb-4">{recipe.name}</h1>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="mb-4">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                className="form-control form-control-lg" // Make the input larger
                required
              />
            </div>
            <div className="form-group">
              <label>Ingredients (comma-separated)</label>
              <input
                type="text"
                name="ingredients"
                value={recipe.ingredients.join(",")}
                onChange={handleChange}
                className="form-control form-control-lg" // Make the input larger
                required
              />
            </div>
            <div className="form-group">
              <label>Instructions</label>
              <textarea
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
                className="form-control form-control-lg" // Make the textarea larger
                required
                rows="5" // Set rows for textarea
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={recipe.image}
                onChange={handleChange}
                className="form-control form-control-lg" // Make the input larger
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Update Recipe</button>
            <button 
              type="button" 
              className="btn btn-secondary btn-lg mx-2" 
              onClick={() => setIsEditing(false)} // Cancel editing
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions</h3>
              <p>{recipe.instructions}</p>
              <Link to="/home" className="btn btn-link">
                Back to Home
              </Link>
              <button 
                onClick={() => setIsEditing(true)} 
                className="btn btn-warning mx-2"
              >
                Edit Recipe
              </button>
              <button 
                onClick={handleDelete} 
                className="btn btn-danger mx-2"
              >
                Delete Recipe
              </button>
            </div>
            <div className="col-md-6">
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
