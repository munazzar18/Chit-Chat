import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import ChatWindow from "./Components/ChatWindow"

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onReply(value) {
      setReplies(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('reply', onReply);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('reply', onReply);
    };
  }, []);

  return (
    <>
      <p>State: {'' + isConnected}</p>
      <ul>
        {replies.map(reply => (
          <li>{reply}</li>
        ))}
      </ul>
      <ChatWindow />
    </>
  )
}

export default App
