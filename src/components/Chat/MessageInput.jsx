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
        console.error("Erreur lors du téléversement du fichier:", error);
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
    <form onSubmit={handleSubmit} className="bg-white flex">
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="flex-grow p-2 border bg-white text-black border-gray-300 rounded-md"
        placeholder="Tapez un message"
        required={!file}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="ml-2 p-2 bg-gray-200 text-black rounded-md"
      />
      <button type="submit" className="ml-2 p-2 bg-[#12bb7d] text-white rounded-md">
        Envoyer
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

export default MessageInput;
