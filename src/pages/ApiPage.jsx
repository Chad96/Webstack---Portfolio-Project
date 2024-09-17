import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShareAlt, FaStar } from 'react-icons/fa';
import './ApiPage.css'; // Assuming you have a CSS file for custom styles

const ApiPage = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(''); // Filter state
  const [ratings, setRatings] = useState({}); // Star ratings

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
            app_id: 'bf8300aa', // Replace with your actual application ID
            app_key: '1edea26f0274fa1e706b3e3c8bf4fe37', // Replace with your actual application key
            from: 0,
            to: 10, // Number of recipes to fetch
            health: filter || undefined, // Apply the filter if present
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
    fetchRecipes(query); // Re-fetch with the new filter
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
      {/* Search and filter section with .api-page */}
      <div className="api-page">
        <header className="header">
          <h3>Recipe Master</h3>
          <nav>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
          </nav>
        </header>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>

          {/* Filter dropdown */}
          <div className="filter-container">
            <label htmlFor="filter">Filter by Health Labels:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="low-sugar">Low Sugar</option>
              <option value="low-fat">Low Fat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recipe results section */}
      <div className="recipes-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {recipes.length > 0 ? (
          recipes.map((item, index) => (
            <div key={index} className="recipe-card">
              <h3>{item.recipe.label}</h3>
              <img
                src={item.recipe.image}
                alt={item.recipe.label}
                className="recipe-image"
              />
              <p><strong>Source:</strong> {item.recipe.source}</p>
              <a
                href={item.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="recipe-link"
              >
                View Recipe
              </a>

              {/* Share button */}
              <button
                className="share-button"
                onClick={() => handleShare(item.recipe)}
              >
                <FaShareAlt /> Share
              </button>

              {/* Star Rating */}
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={ratings[item.recipe.label] >= star ? 'star filled' : 'star'}
                    onClick={() => handleRating(item.recipe.label, star)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default ApiPage;
