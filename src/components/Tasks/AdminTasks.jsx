import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import api from "../../services/api";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [showPending, setShowPending] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get("/tasks");
      setTasks(response.data);
    };
    fetchTasks();

    const fetchUsers = async () => {
      const response = await api.get("/users");
      setUsers(response.data);
    };
    fetchUsers();

    const fetchUserDetails = async () => {
      const response = await api.get("/auth/me");
      setUsername(response.data.username);
    };
    fetchUserDetails();
  }, []);

  const handleAssignTask = async () => {
    try {
      await api.post("/tasks/create", { assignedTo, description, reward });
      const response = await api.get("/tasks");
      setTasks(response.data);
      setDescription("");
      setReward("");
      setAssignedTo("");
      showAlertMessage("Tâche assignée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l&apos;attribution de la tâche:", error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await api.post("/tasks/complete", { taskId });
      const response = await api.get("/tasks");
      setTasks(response.data);
      showAlertMessage("Tâche marquée comme terminée !");
    } catch (error) {
      console.error("Erreur lors de la complétion de la tâche:", error);
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="w-screen p-4 md:p-6 bg-gray-100 min-h-screen">
      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {alertMessage}
        </div>
      )}
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">Tableau de Bord des Tâches Admin</h2>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Bienvenue, {username}</h3>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Attribuer une Nouvelle Tâche</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de la Tâche"
            className="p-2 md:p-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder="Récompense (€)"
            className="p-2 md:p-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="p-2 md:p-3 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un Utilisateur</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAssignTask}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full md:w-auto"
        >
          Attribuer la Tâche
        </button>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowPending(!showPending)}
        >
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">Tâches en Attente</h3>
          {showPending ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showPending && (
          <ul className="space-y-4 mt-4">
            {tasks.filter(task => task.status === "pending").length === 0 && (
              <li className="text-gray-500">Aucune tâche en attente à afficher</li>
            )}
            {tasks.filter(task => task.status === "pending").map((task) => (
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
                    <strong>Attribué à :</strong> {task.assignedTo.username}
                  </p>
                  <p className="text-gray-700">
                    <strong>Statut :</strong> {task.status}
                  </p>
                </div>
                {task.status === "pending" && (
                  <button
                    onClick={() => handleCompleteTask(task._id)}
                    className="mt-4 md:mt-0 ml-0 md:ml-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 w-full md:w-auto"
                  >
                    Marquer comme Terminée
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">Tâches Terminées</h3>
          {showCompleted ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showCompleted && (
          <ul className="space-y-4 mt-4">
            {tasks.filter(task => task.status === "completed").length === 0 && (
              <li className="text-gray-500">Aucune tâche terminée à afficher</li>
            )}
            {tasks.filter(task => task.status === "completed").map((task) => (
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
                  <strong>Attribué à :</strong> {task.assignedTo.username}
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

export default AdminTasks;
