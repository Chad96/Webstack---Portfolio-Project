import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || recipe.category === categoryFilter)
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/src/assets/your-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0",
        margin: "0",
        position: "relative",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetiser">Appetiser</option>
          </select>
        </div>
        <nav
          style={{
            padding: "0 20px",
          }}
        >
          <Link
            to="/"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "white",
            }}
          >
            Home
          </Link>
          <Link
            to="/add-recipe"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "white",
            }}
          >
            Add Recipe
          </Link>
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
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
          paddingTop: "25%",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-4">Saved Recipes</h2>
          <div className="row">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="col-md-6 col-lg-4 d-flex align-items-stretch"
                >
                  <div
                    className="card mb-4"
                    style={{
                      width: "100%",
                      minWidth: "280px",
                      maxWidth: "350px",
                      minHeight: "350px",
                      margin: "auto",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={recipe.image}
                      className="card-img-top"
                      alt={recipe.name}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{recipe.name}</h5>
                        <p className="card-text">
                          <strong>Prep Time:</strong> {recipe.prepTime} mins
                          <br />
                          <strong>Cook Time:</strong> {recipe.cookTime} mins
                        </p>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between">
                          <Link
                            to={`/edit-recipe/${recipe.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/recipe/${recipe.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Full Instructions
                          </Link>
                        </div>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
