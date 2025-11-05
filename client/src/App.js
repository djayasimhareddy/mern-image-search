import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [term, setTerm] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState("");

  useEffect(() => {
    // Fetch current user
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));

    // Fetch top searches
    axios.get("http://localhost:5000/api/top-searches").then((res) => setTopSearches(res.data));
  }, []);

  const handleSearch = async () => {
    if (!term) return;
    const res = await axios.post("http://localhost:5000/api/search", { term, userId: user._id });
    setImages(res.data);
    setSearchedTerm(term);

    const historyRes = await axios.get(`http://localhost:5000/api/history/${user._id}`);
    setHistory(historyRes.data);
  };

  const toggleSelect = (url) => {
    setSelected(selected.includes(url) ? selected.filter((i) => i !== url) : [...selected, url]);
  };

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  // ---------------- LOGIN PAGE ----------------
  if (!user)
    return (
      <div className="login-page">
        <div className="login-box">
          <h1 className="app-title">Image Search App</h1>
          <p className="login-subtitle">Login to explore and save your favorite images!</p>
          <div className="login-buttons">
            <a href="http://localhost:5000/auth/google" className="google-btn">
              Sign in with Google
            </a>
            <a href="http://localhost:5000/auth/github" className="github-btn">
              Sign in with GitHub
            </a>
            <a href="http://localhost:5000/auth/facebook" className="facebook-btn">
              Sign in with Facebook
            </a>
          </div>
        </div>
      </div>
    );

  // ---------------- MAIN APP ----------------
  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="top-header">
        <div className="user-info">
          <span className="username">
            👋 Welcome, <b>{user.name}</b>
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <h2 className="top-banner">
          Top Searches: {topSearches.map((t) => t._id).join(", ") || "None yet"}
        </h2>

        <div className="search-bar">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for images..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {searchedTerm && (
          <p className="result-text">
            You searched for "<b>{searchedTerm}</b>" — {images.length} results.
          </p>
        )}
        <p className="selected-count">Selected: {selected.length} images</p>
      </header>

      {/* Main Content Section */}
      <main className="content">
        <div className="image-grid">
          {images.map((img, i) => (
            <div className="image-card" key={i}>
              <img src={img.urls.small} alt="" />
              <input
                type="checkbox"
                checked={selected.includes(img.urls.small)}
                onChange={() => toggleSelect(img.urls.small)}
              />
            </div>
          ))}
        </div>

        <aside className="history-panel">
          <h3>Your Search History</h3>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                <b>{h.term}</b> <br />
                <span>{new Date(h.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default App;
