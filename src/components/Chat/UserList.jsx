import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

const UserList = ({ users, setUsers, selectUser, selectedUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useAuth();

  const currentUserId = JSON.parse(localStorage.getItem('sickuser'))._id; // Make sure to parse the stored user object

  const handleUserSelect = (user) => {
    selectUser(user);
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        user._id === u._id ? { ...user, unread: false } : u
      )
    );
    setSearchTerm(""); // Clear the search input
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) && user._id !== currentUserId // Exclude current user
  );

  return (
    <div className="w-full h-screen md:w-1/6 border-r-2 border-[#FDB1D7] bg-[#421770] text-white overflow-y-auto">
      <h1 className="text-lg md:text-2xl p-4 border-b-2 text-[#FDB1D7] border-[#FDB1D7]">
        YAP OFF!!!
      </h1>
      <div className="p-4 bg-[#421770]">
        <input
          type="text"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border bg-gray-800 text-[#FDB1D7] border-[#FDB1D7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDB1D7]"
        />
      </div>
      {filteredUsers.length === 0 ? (
        <div className="p-8 text-gray-300 text-center">
          No users here, haha loser.
        </div>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`relative p-8 cursor-pointer flex items-center justify-between ${
              selectedUser?._id === user._id
                ? "bg-gray-800 text-white font-bold duration-500 transform scale-105 rounded-md"
                : user.role === "admin"
                ? "bg-[#421770] text-[#FDB1D7] hover:text-pink-100 font-bold duration-500 transform hover:scale-105 rounded-md"
                : "bg-[#421770] text-[#FDB1D7] font-bold duration-500 transform hover:scale-105 rounded-md"
            }`}
          >
            <span>{user.username}</span>
            {user.unread && (
              <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
            )}
          </div>
        ))
      )}
      <div className="p-4">
        <button
          onClick={logout}
          className="w-full p-2 bg-[#FDB1D7] text-white rounded-md hover:scale-110 focus:outline-none transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      unread: PropTypes.bool,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  setUsers: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default UserList;
