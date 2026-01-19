import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async () => {
    if (!input.trim()) {
      setError("Please enter a movie preference");
      return;
    }

    setLoading(true);
    setError("");
    setMovies("");

    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";
      
      const response = await fetch(`${apiUrl}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Backend error");
      }

      setMovies(data.recommendations);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch recommendations. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && input.trim()) {
      getRecommendations();
    }
  };

  // Format movies text for better display
  const formatMovies = (moviesText) => {
    if (!moviesText) return [];
    // Split by lines and format
    return moviesText.split("\n").filter(line => line.trim());
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <div className="header">
          <div className="logo-icon">🎬</div>
          <h1 className="title">Movie Recommendations</h1>
          <p className="subtitle">Discover your next favorite film powered by AI</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="e.g., action movies with strong female lead, sci-fi thrillers, romantic comedies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <div className="input-icon">🎭</div>
          </div>

          <button 
            className={`search-button ${loading ? "loading" : ""} ${!input.trim() ? "disabled" : ""}`}
            onClick={getRecommendations} 
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Finding Movies...</span>
              </>
            ) : (
              <>
                <span>Get Recommendations</span>
                <span className="button-icon">✨</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Results Section */}
        {movies && (
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">Recommended Movies</h2>
              <div className="results-count">{formatMovies(movies).length} suggestions</div>
            </div>
            <div className="movies-list">
              {formatMovies(movies).map((line, index) => (
                <div key={index} className="movie-item">
                  <div className="movie-number">{index + 1}</div>
                  <div className="movie-name">{line.replace(/^\d+\.\s*/, "")}</div>
                  <div className="movie-icon">🎥</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="footer">
          <p>Powered by AI • Made with ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default App;
