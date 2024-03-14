import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host, allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import ErrorBoundary from "../components/ErrorBoundary";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          const user = JSON.parse(localStorage.getItem("chat-app-user"));
          setCurrentUser(user);

          if (user.isAvatarImageSet) {
            const response = await axios.get(allUsersRoute);
            console.log("Contacts Response:", response.data);
            setContacts(response.data);
            setIsLoaded(true);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChatChange = (chatId) => {
    console.log("Selected chatId:", chatId);
    setCurrentChat(chatId);
  };
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  return (
    <ErrorBoundary>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </ErrorBoundary>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .container {
    height: 100vh;
    width: 100vw;
    background-color: #09427a;
    /* background-color: #5850bb;  */
    /* background-color: #cdc9fd;  */
    /* background-color:#f4ecfe; */
    display: grid;
    grid-template-columns: 35% 65%;
    /* @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    } */
    
  }
`;

export default Chat;
