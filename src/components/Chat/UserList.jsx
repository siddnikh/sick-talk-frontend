import { useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

const UserList = ({ users, setUsers, selectUser, selectedUser }) => {
  const [composeMode, setComposeMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserSelect = (user) => {
    selectUser(user);
    setUsers((prevUsers) => {
      return prevUsers.map((u) => {
        if (user._id === u._id) {
          return { ...user, unread: false };
        }
        return u;
      });
    });
  };

const handleCompose = async () => {
  try {
    const response = await api.get(`/users/exists/${newUsername}`);
    if (response.status !== 200) {
      setErrorMessage("Utilisateur non trouvé :(");
    } else {
      const result = response.data;
      
      // Check if the user already exists in prevUsers
      const userExists = users.some(user => user._id === result.id);

      if (!userExists) {
        // Add the user to users list
        setUsers((prevUsers) => [
          ...prevUsers,
          { _id: result.id, username: result.username, unread: false, role: result.role },
        ]);
      }

      // Select the user and update state
      selectUser({ _id: result.id, username: result.username, role: result.role });
      setComposeMode(false);
      setNewUsername("");
      setErrorMessage("");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error);
    setErrorMessage(error.response?.data?.message || "Utilisateur non trouvé");
  }
};

  return (
    <div className="w-full md:w-1/3 border-r bg-gray-200 border-white text-black h-screen overflow-y-auto">
      <button
        className="w-full p-4 bg-green-500 text-white font-bold"
        onClick={() => {
          setComposeMode(!composeMode);
          setNewUsername("");
          setErrorMessage("");
        }}
      >
        Composer
      </button>
      {composeMode && (
        <div className="p-4 bg-white border-b border-gray-300">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Entrez le nom d&apos;utilisateur"
            className="w-full p-2 border bg-white border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleCompose}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Envoyer
          </button>
          {errorMessage && (
            <div className="text-red-500 mt-2 animate-pulse">
              {errorMessage}
            </div>
          )}
        </div>
      )}
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => handleUserSelect(user)}
          className={`relative p-8 cursor-pointer flex items-center justify-between ${
            selectedUser?._id === user._id
              ? "bg-blue-500 text-white font-bold duration-500 transform scale-105 rounded-md"
              : user.role === "admin"
              ? "bg-yellow-500 text-white font-bold duration-500 transform scale-105 rounded-md"
              : ""
          }`}
        >
          <span>{user.username}</span>
          {user.unread && (
            <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
          )}
        </div>
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      unread: PropTypes.bool,
      role: PropTypes.string.isRequired, // Add role to the prop types
    })
  ).isRequired,
  setUsers: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string, // Add role to the prop types
  }),
};

export default UserList;
