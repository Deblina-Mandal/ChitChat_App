import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

export default function ChatContainer({ currentChat }) {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/messages/${currentChat.id}`);
        setChatMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    if (currentChat) {
      fetchChatMessages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    alert(msg);
    try {
      await axios.post(`/api/chat/messages/${currentChat.id}`, { message: msg });
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
            <Logout />
          </div>
          <Messages messages={chatMessages} />
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
          color: white;
        }
      }
    }
  }
`;
