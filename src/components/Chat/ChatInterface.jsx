import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import api from "../../services/api";

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
    }
    // Fetch the list of users
    api.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, [navigate]);

  const addUnreadMessage = (userId) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user._id === userId) {
          return { ...user, unread: true };
        }
        return user;
      });
    });
  };

  const addNewUserToList = (user) => {
    setUsers((prevUsers) => [...prevUsers, { ...user, unread: true }]);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl">Chat</h1>
        <Link to="/tasks" className="text-sm md:text-base bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-gray-200 transition">
          Aller aux Tâches
        </Link>
      </div>
      <div className="flex flex-grow">
        <UserList
          users={users}
          setUsers={setUsers}
          selectUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        <ChatWindow
          selectedUser={selectedUser}
          addUnreadMessage={addUnreadMessage}
          users={users}
          addNewUserToList={addNewUserToList}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
