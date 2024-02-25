import React from "react";
import styled from "styled-components";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <h1>
        Welcome! , <span>{currentUser && currentUser.username}</span>
      </h1>
      <h3>Please select a chat to start messaging!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: #09427a;

  span {
    /* Additional styling for the span if needed */
  }

  img {
    height: 20rem;
  }
`;

