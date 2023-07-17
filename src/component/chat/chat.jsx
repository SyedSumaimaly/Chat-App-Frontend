import React, { useState } from 'react'
import { useEffect, } from 'react';
import "./chat.css"
import socketIo from "socket.io-client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { user } from '../join/join';
import Message from "../message/message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:3001/"

function Chat() {

  const [id, setid] = useState("");
  const [messages, setmessages] = useState([])

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
  };

  useEffect(() => {

    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {

      setid(socket.id);
    })

    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setmessages([...messages, data]);
    })

    socket.on('userjoined', (data) => {
      setmessages([...messages, data]);
    })

    socket.on('leave', (data) => {
      setmessages([...messages, data]);
    })

    return () => {
      socket.emit('Disconnect');
      socket.off();
    }

  }, [])


  useEffect(() => {

    socket.on('sendMessage', (data) => {
      setmessages([...messages, data]);
    });
    return () => {
      socket.off();
    };
  }, [messages])

  return (
    <div className='ChatPage'>
      <div className="chatContainer">
        <div className="chatHeader">
          <h2>Chat-App</h2>
          <a href="/" className='Xicon'><FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff", }} /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
        </ReactScrollToBottom>
        <div className="InputBox">
          <input type="text" id="chatInput" onKeyPress={(event) => event.key == 'Enter' ? send() : null} />
          <button onClick={send} className='sendBtn' ><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2xl" style={{ color: "#f1f2f4", }} /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat
