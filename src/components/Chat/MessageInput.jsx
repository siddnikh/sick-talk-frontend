import { useState } from "react";
import PropTypes from "prop-types";

const MessageInput = ({ sendMessage, uploadFile }) => {
  const [messageContent, setMessageContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        await uploadFile(file);
        setFile(null);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    } else {
      sendMessage({ type: "text", content: messageContent });
    }
    setMessageContent("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#421770] flex p-4">
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="flex-grow p-2 border bg-gray-800 text-[#FDB1D7] border-[#FDB1D7] rounded-md focus:outline-none"
        placeholder="Type a message"
        required={!file}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="ml-2 p-2 bg-gray-800 border-[#FDB1D7] rounded-md"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-700 text-white rounded-md">
        Send
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

export default MessageInput;
