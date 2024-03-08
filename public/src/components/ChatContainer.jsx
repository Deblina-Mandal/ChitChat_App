import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Dropdown1 from "./Dropdown1";
import ChatInput from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import SearchText from "./SearchText";
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

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
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...chatMessages];
    msgs.push({ fromSelf: true, message: msg });
    setChatMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setChatMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" ,block: "end"});
  }, [chatMessages]);
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
            <div className="buttons-list">
              <SearchText />
              <Dropdown1 />
            </div>
          </div>

          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sent" : "received"
                  }`}
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
    .buttons-list {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffffffc8;
        border-radius: 1rem;
      }
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #ffffff39;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px #ffffff39;
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
      }
    }
  }
  .sent {
    justify-content: flex-end;
    .content {
      /* background-color: #d6b2ff; */
      /* background-color: #aee2ed; */
      /* background-color: #c9f8f8; */
      /* background-color: #5850bb; */
      /* background-color: #1d0efa;  */
      /* background-color:#d7b8f3; */
      background-color: #cdc9fd;
      /* p{color:white;} */
    }
  }
  .received {
    justify-content: flex-start;
    .content {
      background-color: #fff;
      p {
        color: #000000;
      }
    }
  }
`;
