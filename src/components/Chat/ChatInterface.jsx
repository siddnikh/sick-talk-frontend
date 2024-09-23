import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import api from "../../services/api";

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("sickuser");
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
    <div
      className="h-screen w-screen bg-[#421770]"
      style={{
        fontFamily: "'Pixelify Sans', sans-serif", // Applying Pixelify Sans font
      }}
    >
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
