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
    <div className="h-screen w-screen bg-white">
      <div className="bg-white text-black p-4 flex justify-between border-b-2 border-gray-200 items-center">
        <h1 className="text-lg md:text-2xl">Chat</h1>
        <Link to="/tasks" className="text-sm md:text-base bg-[#12bb7d] text-white px-3 py-2 rounded-md hover:bg-green-300 hover:text-white transition">
          Aller aux Tâches
        </Link>
      </div>
      <div className="flex">
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
