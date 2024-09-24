import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaImage } from "react-icons/fa"; // Import an icon for image upload

const MessageInput = ({ sendMessage, uploadFile }) => {
  const [messageContent, setMessageContent] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        await uploadFile(file);
        setFile(null); // Clear the file input after upload
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

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger file input click when icon is clicked
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#421770] flex p-4">
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="flex-grow p-2 bg-gray-800 text-[#FDB1D7] border-0 rounded-md focus:outline-none"
        placeholder={file ? "Image ready to send" : "Type a message"}
        required={!file}
        disabled={!!file} // Disable input when a file is uploaded
      />
      <div
        onClick={handleIconClick}
        className="ml-2 p-2 bg-gray-800 border-[#FDB1D7] rounded-md cursor-pointer"
      >
        <FaImage className="text-[#FDB1D7] text-lg" />
      </div>
      <input
        type="file"
        accept="image/*" // Only accept image files
        onChange={handleFileChange}
        className="hidden" // Hide the default file input
        ref={fileInputRef} // Assign the ref to the file input
      />
      {file && (
        <div className="ml-2 p-2 text-[#FDB1D7]">
          {file.name} uploaded
        </div>
      )}
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-700 text-white rounded-md focus:outline-1 focus:outline-[#FDB314]"
      >
        {file ? "Send Image" : "Send"}
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

export default MessageInput;
