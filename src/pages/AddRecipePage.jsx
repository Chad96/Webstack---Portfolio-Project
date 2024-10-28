import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    servings: '',
    image: null,
    difficulty: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const getBase64Image = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      image: formData.image ? await getBase64Image(formData.image) : null,
    };

    try {
      await axios.post("http://localhost:5000/recipes", recipeData);
      alert("Recipe added successfully!");
    } catch (error) {
      console.error("Failed to add recipe:", error);
      alert("Failed to add recipe.");
    }
  };

  const formStyle = {
    maxWidth: "800px",
    margin: "auto",
    padding: "15px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        backgroundImage: `url('/src/assets/your-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: "1000",
        }}
      >
        <h3 style={{ margin: "0", paddingLeft: "20px" }}>Recipe Master</h3>
        <nav style={{ padding: "0 20px" }}>
          <Link to="/" style={{ marginRight: "20px", textDecoration: "none", color: "white" }}>
            Home
          </Link>
          <Link to="/home" style={{ marginRight: "20px", textDecoration: "none", color: "white" }}>
            Saved Recipes
          </Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>
            Profile
          </Link>
        </nav>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          paddingTop: "80px",
        }}
      >
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 className="text-center mb-4">Add a New Recipe</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Recipe Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Category</label>
              <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Preparation Time</label>
              <input type="number" className="form-control" name="preparationTime" value={formData.preparationTime} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Cooking Time</label>
              <input type="number" className="form-control" name="cookingTime" value={formData.cookingTime} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Servings</label>
              <input type="number" className="form-control" name="servings" value={formData.servings} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Difficulty</label>
              <select className="form-control" name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label>Ingredients (comma-separated)</label>
            <textarea className="form-control" name="ingredients" value={formData.ingredients} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label>Instructions</label>
            <textarea className="form-control" name="instructions" value={formData.instructions} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label>Image</label>
            <input type="file" className="form-control" name="image" accept="image/*" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
