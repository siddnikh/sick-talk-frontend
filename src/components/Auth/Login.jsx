import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/login-bg.png"; // Importing background image
import sicktalk from "../../assets/sicktalk.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        setSuccess("Login successful! Redirecting to dashboard...");
        setError(null);
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      } else {
        setError(
          "Login failed. Please check your username and password and try again."
        );
      }
    } catch (error) {
      setError(
        "Login failed. Please check your username and password and try again."
      );
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-screen items-center justify-center min-h-screen bg-gray-100 md:px-0 px-12"
      style={{
        backgroundImage: `url(${loginBg})`, // Applying the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Pixelify Sans', sans-serif", // Applying Pixelify Sans font
      }}
    >
      <img src={sicktalk} alt="SickTalk Logo" className="md:w-1/3 w-full mx-auto" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-md transform transition-transform duration-500 ease-in-out hover:scale-105">
  <h2 className="text-4xl font-bold text-center text-[#FDB1D7]">Login</h2>
  {error && (
    <div
      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg animate-pulse"
      role="alert"
    >
      {error}
    </div>
  )}
  {success && (
    <div
      className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg animate-pulse"
      role="alert"
    >
      {success}
    </div>
  )}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-200">
        Username:
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-3 py-2 mt-1 text-gray-200 bg-gray-500 placeholder-gray-500 border border-[#FDB1D7] rounded-md focus:outline-none"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-200">
        Password:
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 mt-1 text-gray-200 bg-gray-500 placeholder-gray-500 border border-[#FDB1D7] rounded-md focus:outline-none"
      />
    </div>
    <button
      type="submit"
      className="w-full px-4 py-2 font-medium text-white bg-[#8535d0] rounded-md hover:bg-[#c83fc1] focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      Login
    </button>
  </form>
  <div className="text-sm text-center text-[#FDB1D7]">
    Don&apos;t have an account? Go fuck yourself.
  </div>
</div>

    </div>
  );
};

export default Login;
