import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSocket } from "../../hooks/useSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import api from "../../services/api";

const ChatWindow = ({
  selectedUser,
  addUnreadMessage,
  users,
  addNewUserToList,
}) => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  const userId = JSON.parse(localStorage.getItem("sickuser"))?._id;

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id).then((msgs) => setMessages(msgs));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket && selectedUser) {
      const handleReceiveMessage = (message) => {
        if (
          !users.find(
            (user) =>
              user._id === message.sender._id || userId === message.sender._id
          )
        ) {
          addNewUserToList(message.sender);
        }

        if (
          (message.sender._id === selectedUser._id &&
            message.recipient === userId) ||
          (message.sender._id === userId &&
            message.recipient === selectedUser._id)
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
        } else if (message.recipient === userId) {
          const audio = new Audio("/notif.mp3");
          audio.play();
          addUnreadMessage(message.sender._id);
        }
      };

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [socket, selectedUser, addUnreadMessage, userId, users, addNewUserToList]);

  const fetchMessages = async (userId) => {
    try {
      const response = await api.get(`/chat/messages/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const sendMessage = (messageContent) => {
    const message = {
      recipient: selectedUser._id,
      message: messageContent,
    };
    socket.emit("sendMessage", message);
  };

  const uploadFile = async (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const buffer = e.target.result;

      socket.emit(
        "uploadFile",
        { file: buffer, fileName: file.name, recipient: selectedUser._id },
        (response) => {
          if (response.error) {
            console.error("Error uploading file:", response.error);
          } else {
            sendMessage({ type: "media", url: response.url });
          }
        }
      );
    };

    reader.readAsArrayBuffer(file);
  };

  if (!selectedUser) {
    return (
      <div className="w-full text-2xl text-[#FDB1D7] p-4">
        *sigh* <br />
        select a user.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between max-h-screen">
      <div className="p-4 h-16 bg-[#421770] text-[#FDB1D7] border-2 flex items-center justify-between border-b-2 border-l-0 border-[#FDB1D7]">
        <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
      </div>
      <div className="overflow-y-auto">
        <MessageList messages={messages} selectedUser={selectedUser} />
      </div>
      <div className="border-t bg-[#421770] border-[#FDB1D7] p-4">
        <MessageInput sendMessage={sendMessage} uploadFile={uploadFile} />
      </div>
    </div>
  );
};

ChatWindow.propTypes = {
  selectedUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string,
  }).isRequired,
  addUnreadMessage: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  addNewUserToList: PropTypes.func.isRequired,
};

export default ChatWindow;
