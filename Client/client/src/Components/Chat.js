import React, { useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

function Chat({ username }) {
  return (
    <ChatEngine
      height="93vh"
      projectID="36bf1eae-6e46-41de-9423-fccee3967145"
      userName={username}
      userSecret="1234"
    />
  );
}

export default Chat;
