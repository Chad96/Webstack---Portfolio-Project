import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipePage = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details by ID
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

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
        <div className="row">
          <div className="col-md-6">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.split("\n").map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              Back to Home
            </Link>
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
      </div>
    </div>
  );
};

export default RecipePage;
