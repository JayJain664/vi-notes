import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("login");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  // Enter key support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode]);

  const handleSubmit = () => {
    alert(`${mode} clicked 🚀`);
  };

  return (
    <div className="wrapper">
      <div className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "🌙 Dark" : "☀️ Light"}
      </div>

      <div className="glass-card">
        <h2>{mode === "login" ? "Welcome Back 👋" : "Create Account ✨"}</h2>

        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        {mode === "register" && (
          <input type="password" placeholder="Confirm Password" />
        )}

        <button onClick={handleSubmit}>
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p>
          {mode === "login"
            ? "New here?"
            : "Already have an account?"}
          <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
