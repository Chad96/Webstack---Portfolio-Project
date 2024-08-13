import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    preparationTime: "",
    cookingTime: "",
    servings: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/recipes",
        formData
      );
      console.log("Recipe added:", response.data);
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>
      <InputField
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="ingredients"
        placeholder="Ingredients"
        value={formData.ingredients}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="instructions"
        placeholder="Instructions"
        value={formData.instructions}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="preparationTime"
        placeholder="Preparation Time"
        value={formData.preparationTime}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="cookingTime"
        placeholder="Cooking Time"
        value={formData.cookingTime}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="servings"
        placeholder="Servings"
        value={formData.servings}
        onChange={handleChange}
      />
      <Button text="Add Recipe" />
    </form>
  );
};

export default AddRecipePage;
