import { useState, useEffect } from "react";
import api from "../../services/api";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingUserDetails, setLoadingUserDetails] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/auth/me");
        setBalance(response.data.balance);
        setUsername(response.data.username);
        setLoadingUserDetails(false);
      } catch (error) {
        setError("Échec de la récupération des détails de l'utilisateur");
        setLoadingUserDetails(false);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
        setLoadingTasks(false);
      } catch (error) {
        setError("Échec de la récupération des tâches");
        setLoadingTasks(false);
      }
    };

    fetchUserDetails();
    fetchTasks();
  }, []);

  return (
    <div className="w-screen p-4 md:p-6 bg-gray-100 min-h-screen">
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {error}
        </div>
      )}
      <h2 className="text-xl md:text-2xl font-bold text-[#12bb7d] mb-4">
        Tableau de Bord des Tâches Utilisateur
      </h2>
      <button
        onClick={() => navigate("/chat")}
        className="bg-[#12bb7d] text-white py-2 px-4 rounded-lg hover:bg-[#0fa96b] transition duration-300 mb-4"
      >
        Retour au Chat
      </button>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
        {loadingUserDetails ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin mr-2" />
            <span>Chargement des détails de l&apos;utilisateur...</span>
          </div>
        ) : (
          <>
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
              Bienvenue, {username}
            </h3>
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
              Votre Solde
            </h3>
            <p className="text-2xl text-green-600 font-bold">{balance} €</p>
          </>
        )}
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
        <div className="flex justify-between items-center cursor-pointer">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">
            Tâches en Attente
          </h3>
        </div>
        {loadingTasks ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin mr-2" />
            <span>Chargement des tâches...</span>
          </div>
        ) : (
          <ul className="space-y-4 mt-4">
            {tasks.filter((task) => task.status === "pending").length === 0 && (
              <li className="text-gray-500">
                Aucune tâche en attente à afficher
              </li>
            )}
            {tasks
              .filter((task) => task.status === "pending")
              .map((task) => (
                <li
                  key={task._id}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="w-full md:w-auto">
                    <p className="text-gray-700">
                      <strong>Description :</strong> {task.description}
                    </p>
                    <p className="text-gray-700">
                      <strong>Récompense :</strong> {task.reward} €
                    </p>
                    <p className="text-gray-700">
                      <strong>Statut :</strong> {task.status}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center cursor-pointer">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">
            Tâches Terminées
          </h3>
        </div>
        {loadingTasks ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin mr-2" />
            <span>Chargement des tâches...</span>
          </div>
        ) : (
          <ul className="space-y-4 mt-4">
            {tasks.filter((task) => task.status === "completed").length ===
              0 && (
              <li className="text-gray-500">
                Aucune tâche terminée à afficher
              </li>
            )}
            {tasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <li
                  key={task._id}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <p className="text-gray-700">
                    <strong>Description :</strong> {task.description}
                  </p>
                  <p className="text-gray-700">
                    <strong>Récompense :</strong> {task.reward} €
                  </p>
                  <p className="text-gray-700">
                    <strong>Statut :</strong> {task.status}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserTasks;
