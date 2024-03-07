import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Dropdown1 from "./Dropdown1";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser }) {
  const [chatMessages, setChatMessages] = useState([]);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setChatMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    if (currentChat) {
      fetchChatMessages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
   
    fetchChatMessages();
  };

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Dropdown1 />
          </div>

          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index}>
                <div
                  className={`message ${message.fromSelf ? "sent" : "received"}`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  /* padding-top: 1rem; */
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: azure;
    height: 100%;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          /* color: white; */
        }
      }
    }
  }
  .chat-messages{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    .message{
      display:flex;
      align-items:center;
      .content{
        max-width:40%;
        overflow-wrap:break-word;
        padding:1rem;
        font-size:1.1rem;
        border-radius: 1rem;
        color: black;
      }
    }
  }
  .sent{
    justify-content: flex-end;
    .content{
      background-color: #d6b2ff;
    }
  }
  .received{
    justify-content: flex-start;
    .content{
      background-color:#fff ;
      p{color:#000000;}
      
    }
  }
`;
