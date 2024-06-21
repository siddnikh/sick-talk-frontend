import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

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
        setSuccess("Connexion réussie! Redirection vers le tableau de bord...");
        setError(null);
        setTimeout(() => {
            navigate("/chat");
          }, 2000);
      } else {
        setError(
          "Échec de la connexion. Veuillez vérifier votre nom d'utilisateur et mot de passe et réessayer."
        );
      }
    } catch (error) {
      setError(
        "Échec de la connexion. Veuillez vérifier votre nom d'utilisateur et mot de passe et réessayer."
      );
      console.error("Échec de la connexion:", error);
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-100 md:px-0 px-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md transform transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe :
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connexion
          </button>
        </form>
        <div className="text-sm text-black text-center">
          Vous n&apos;avez pas de compte?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
