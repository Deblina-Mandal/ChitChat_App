import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import ErrorBoundary from "../components/ErrorBoundary";

function Chat() {
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
            <ChatContainer currentChat={currentChat} currentUser={currentUser} />
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
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
