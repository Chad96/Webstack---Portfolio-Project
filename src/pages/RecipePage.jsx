import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShareAlt, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApiPage.css'; // Assuming you want to separate the styles in a CSS file

const ApiPage = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [ratings, setRatings] = useState({});

  const navigate = useNavigate();

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.edamam.com/search`,
        {
          params: {
            q: searchQuery,
            app_id: 'bf8300aa', 
            app_key: '1edea26f0274fa1e706b3e3c8bf4fe37',
            from: 0,
            to: 10, 
            health: filter || undefined,
          },
        }
      );
      setRecipes(response.data.hits);
    } catch (err) {
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(query);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    fetchRecipes(query); 
  };

  const handleRating = (recipeLabel, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [recipeLabel]: rating,
    }));
  };

  const handleShare = (recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.label,
        text: 'Check out this recipe!',
        url: recipe.url,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Your browser does not support sharing.');
    }
  };

  return (
    <div>
      {/* Custom-styled Navigation Bar */}
      <nav className="navbar custom-navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/">Recipe App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="nav-link btn custom-nav-link" onClick={() => navigate('/')}>Home</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn custom-nav-link" onClick={() => navigate('/profile')}>Profile</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn custom-nav-link" onClick={() => navigate('/about')}>About</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Rest of your ApiPage content */}
      <div className="api-page">
        {/* Your existing search, filter, and recipe display logic here */}
      </div>
    </div>
  );
};

export default ApiPage;
