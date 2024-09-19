import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShareAlt, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

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
      navigator
        .share({
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
      {/* Bootstrap-styled Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <button className="nav-link btn" onClick={() => navigate('/')}>Home</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => navigate('/profile')}>Profile</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => navigate('/about')}>About</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-5">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes..."
            />
            <button type="submit" className="btn btn-primary">
              <FaSearch /> Search
            </button>
          </div>
        </form>

        <div className="mb-4">
          <label htmlFor="filter" className="form-label">Filter by Health Labels:</label>
          <select id="filter" className="form-select" value={filter} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="low-sugar">Low Sugar</option>
            <option value="low-fat">Low Fat</option>
          </select>
        </div>

        {/* Recipes Display */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {recipes.length > 0 ? (
            recipes.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <img src={item.recipe.image} className="card-img-top" alt={item.recipe.label} />
                  <div className="card-body">
                    <h5 className="card-title">{item.recipe.label}</h5>
                    <p className="card-text"><strong>Source:</strong> {item.recipe.source}</p>
                    <a href={item.recipe.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      View Recipe
                    </a>

                    <button
                      className="btn btn-outline-secondary mt-2"
                      onClick={() => handleShare(item.recipe)}
                    >
                      <FaShareAlt /> Share
                    </button>

                    <div className="mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          onClick={() => handleRating(item.recipe.label, star)}
                          style={{
                            color: ratings[item.recipe.label] >= star ? 'gold' : 'gray',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <p>No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPage;
