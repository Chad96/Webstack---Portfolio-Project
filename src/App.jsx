import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AddRecipePage from "./pages/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipePage from "./pages/RecipePage"; // Import RecipePage

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />{" "}
            {/* Add this line */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
