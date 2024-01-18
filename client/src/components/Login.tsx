import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      if (authContext) {
        authContext.setLoggedIn(true);
      }
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("Login failed: " + error.response.data.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="py-4 px-8 mt-3">
          <div className="text-center font-bold text-2xl">Login</div>
          <form onSubmit={handleSubmit} className="mt-6">
            {error && <p className="text-red-600">{error}</p>}
            <div className="my-5 text-sm">
              <label htmlFor="username" className="block text-black">
                Username
              </label>
              <input
                type="text"
                autoFocus
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Username"
              />
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-blue-500 hover:bg-blue-700 py-3 rounded-sm text-white font-semibold mb-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
