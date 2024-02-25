import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Dropdown1 from "./Dropdown1";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatContainer({ currentChat }) {
  const [chatMessages, setChatMessages] = useState([]);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`/api/chat/messages/${currentChat.id}`);
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
    alert(msg);
    try {
      await axios.post(`/api/chat/messages/${currentChat.id}`, {
        message: msg,
      });
      fetchChatMessages(); // Refetch the updated messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
          <Messages messages={chatMessages} />
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
`;
