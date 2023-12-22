import React, { useEffect, useState } from 'react';
import { MdOutlineSend } from "react-icons/md";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatApp = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);


    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
    
            await socket.emit("send_message", messageData);
            setMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
            setMessage("");
        });
    }, [socket]);

    return (
        <>
            <div className="chat-window">
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {
                            messageList.map((messageContent) => {
                                return (
                                    <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                        <div>
                                            <div className="message-content">
                                                <p>{messageContent.message}</p>
                                            </div>
                                            <div className="message-meta">
                                                <p id='time'>{messageContent.time}</p>
                                                <p id='author'>{messageContent.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input type="tex" value={message} placeholder='Hey...' onChange={(evt) => { setMessage(evt.target.value) }} />
                    <button onClick={sendMessage}><MdOutlineSend /></button>
                </div>
            </div>
        </>
    )
};

export default ChatApp;
