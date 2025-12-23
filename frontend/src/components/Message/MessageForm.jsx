import React from 'react';

const MessageForm = () => (
  <form className="p-4">
    <textarea placeholder="Write encrypted message" className="input w-full" />
    <button className="btn mt-2">Send</button>
  </form>
);

export default MessageForm;

