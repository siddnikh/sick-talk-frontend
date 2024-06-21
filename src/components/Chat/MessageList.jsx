import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { FaPaperclip } from "react-icons/fa";
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
    <div className="bg-white h-full p-4 flex flex-col space-y-4 overflow-y-auto">
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
                ? "bg-gray-200 text-black animate-fade-in-left"
                : "bg-blue-500 text-white animate-fade-in-right"
            }`}
          >
            {message.message.type === "text" ? (
              <p>{message.message.content}</p>
            ) : (
              <div className="flex items-center">
                <FaPaperclip className="mr-2" />
                <a
                  href={`${REACT_APP_API_URL}${message.message.url}`}
                  download
                  className="text-black underline"
                >
                  {message.message.url.split('/').pop()}
                </a>
              </div>
            )}
            <span className="text-sm block mt-2">
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
