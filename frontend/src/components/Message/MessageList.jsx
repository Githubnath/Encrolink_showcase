import React from "react";

const MessageList = ({ messages }) => {
  // Normalize messages into an array
  let safeMessages = [];

  if (Array.isArray(messages)) {
    safeMessages = messages;
  } else if (messages && typeof messages === "object") {
    // If backend returns { messages: [...] }
    safeMessages = messages.messages || [];
  } else if (typeof messages === "string") {
    // If just a single string
    safeMessages = [messages];
  }

  return (
    <ul className="mt-4">
      {safeMessages.length === 0 ? (
        <li className="text-gray-500">No messages yet</li>
      ) : (
        safeMessages.map((msg, idx) => (
          <li key={idx} className="mb-2 border p-2 rounded">
            {typeof msg === "string" ? msg : JSON.stringify(msg)}
          </li>
        ))
      )}
    </ul>
  );
};

export default MessageList;

