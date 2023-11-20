import React, { useState } from 'react';
import io from "socket.io-client";
import ChatApp from './components/Chat/ChatApp';
import "./App.css";

const socket = io.connect("http://127.0.0.1:3001");

const App = () => {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (user !== '' && room !== '') {
      socket.emit("join_room", { user, room });
      setShowChat(true);
    }
  };

  return (
    <div className="app">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" placeholder='John...' onChange={(evt) => { setUser(evt.target.value) }} />
          <input type="text" placeholder='Room ID...' onChange={(evt) => { setRoom(evt.target.value) }} />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatApp socket={socket} username={user} room={room} />
      )}
    </div>
  )
};

export default App;