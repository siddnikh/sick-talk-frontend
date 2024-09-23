import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { REACT_APP_API_URL } from "../../../constants.json";

const MessageList = ({ messages, selectedUser }) => {
  const messageEndRef = useRef(null);
  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();

    const isToday = messageDate.toDateString() === now.toDateString();

    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };

    if (isToday) {
      return messageDate.toLocaleTimeString(undefined, timeOptions);
    } else {
      return `${messageDate.toLocaleDateString(
        undefined,
        dateOptions
      )} ${messageDate.toLocaleTimeString(undefined, timeOptions)}`;
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-[#421770] h-full p-4 flex flex-col space-y-4 overflow-y-auto overflow-x-clip">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender._id === selectedUser._id
              ? "justify-start"
              : "justify-end"
          }`}
        >
          <div
            className={`rounded-lg p-3 max-w-xs md:max-w-md ${
              message.sender._id === selectedUser._id
                ? "bg-[#FDB1D7] text-gray-800 animate-fade-in-left"
                : "bg-purple-600 text-white animate-fade-in-right"
            }`}
          >
            {message.message.type === "text" ? (
              <p>{message.message.content}</p>
            ) : (
              <div className="flex-col flex items-center border-2 border-[#FDB1D7] p-2 rounded-md bg-[#421770] shadow-md">
                <img
                  src={`${REACT_APP_API_URL}${message.message.url}`}
                  alt="Uploaded"
                  className="w-full h-auto max-w-lg object-contain rounded-md mr-2" // Display full image
                />
                <a
                  href={`${REACT_APP_API_URL}${message.message.url}`}
                  download
                  className="text-[#FDB1D7] hover:text-pink-300 flex items-center mt-4"
                >
                  <FaDownload className="w-5 h-5 ml-2" />{" "}
                </a>
              </div>
            )}
            <span className="text-sm block mt-2 text-white">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.shape({
        type: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string, // Optional: only for media messages
      }).isRequired,
      sender: PropTypes.shape({
        username: PropTypes.string.isRequired,
        _id: PropTypes.string,
      }).isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageList;
