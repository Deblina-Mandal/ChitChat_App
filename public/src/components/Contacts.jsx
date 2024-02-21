import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/chat1.png";
import Dropdown from "../components/Dropdown";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img className="brand-img"
              src={logo}
              alt="logo"
            />
            <h3>ChitChat</h3>
            <Dropdown/>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>

                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>

            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #251b5b;
  .brand {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 1rem;
    background-color: #ffffffc7;
    justify-content: space-between; /* Added this line */
    padding: 0 1.5rem; /* Adjusted padding */
    height: 3rem;
    img {
      height: 2rem;
    }
    .brand-img{
      background-color: white;
      border-radius: 10px;
    }
    h3 {
      /* color: white; */
      color: black;
      text-transform: uppercase;
      
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding-top: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffffff39;
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
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0ms.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border: 0.2rem solid white;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0470c9df;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 2rem;
    padding-left: 1.5rem;
    .avatar {
      img {
        height: 3.5rem;
        max-inline-size: 100%;
        border: 0.2rem solid white;
        border-radius: 50%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
