import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser?._id,
          to: currentChat?._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (currentChat && currentUser) {
      fetchData();
    }
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    try {
      // Send new message
      await axios.post(sendMessageRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
        message: msg,
      });

      // Refetch the updated messages
      fetchData();
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
                  src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat?.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message?._id}>
                <div
                  className={`message ${
                    message?.fromSelf ? "sended" : "received"
                  }`}
                >
                  <div className="content">
                    <p>{message?.message}</p>
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
