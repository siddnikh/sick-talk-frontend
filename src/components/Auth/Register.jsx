import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "user";
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(username, email, password, role);
      setSuccess("Inscription réussie! Redirection vers la connexion...");
      setError(null);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-100 md:px-0 px-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md transform transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Inscription
        </h2>
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
            <label className="block text-sm font-medium text-gray-700">
              Nom d&apos;utilisateur :
            </label>
            <input
              type="text"
              placeholder="Nom d&apos;utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-[#12bb7d] focus:border-[#12bb7d]"
            />
             <label className="block mt-4 text-sm font-medium text-gray-700">
              Email :
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-[#12bb7d] focus:border-[#12bb7d]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe :
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-[#12bb7d] focus:border-[#12bb7d]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-[#12bb7d] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Inscription
          </button>
        </form>
        <div className="text-sm text-black text-center">
          Vous avez déjà un compte?{" "}
          <Link
            to="/login"
            className="font-medium text-[#12bb7d] hover:text-[#12bb7d]"
          >
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
