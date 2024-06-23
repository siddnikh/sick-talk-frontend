import { useState } from "react";
import PropTypes from "prop-types";

const UserList = ({ users, setUsers, selectUser, selectedUser }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserSelect = (user) => {
    selectUser(user);
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        user._id === u._id ? { ...user, unread: false } : u
      )
    );
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen md:w-1/3 border-r-2 bg-white border-gray-200 text-black overflow-y-auto">
      <div className="p-4 bg-white">
        <input
          type="text"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border bg-gray-100 text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12bb7d]"
        />
      </div>
      {filteredUsers.length === 0 ? (
        <div className="p-8 text-gray-500 text-center">
          No users found.
        </div>
      ) : (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`relative p-8 cursor-pointer flex items-center justify-between ${
              selectedUser?._id === user._id
                ? "bg-[#12bb7d] text-white font-bold duration-500 transform scale-105 rounded-md"
                : user.role === "admin"
                ? "bg-yellow-200 text-black hover:text-gray-500 font-bold duration-500 transform hover:scale-105 rounded-md"
                : ""
            }`}
          >
            <span>{user.username}</span>
            {user.unread && (
              <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
            )}
          </div>
        ))
      )}
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
