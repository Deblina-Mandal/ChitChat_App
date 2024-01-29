import React from "react";
import styled from "styled-components";

export default function Welcome() {
  return (
    <Container>
      
      <h1>
        Welcome!
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
img{
    height: 20rem;
}

`;
