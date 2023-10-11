import React,{ userState, useEffect } from 'react'
import styled from "styled-components";
import axios from "axios";
function Chat() {
  
  
  return (
    <Container>
      <div className="container">

      </div>
    </Container>
  )
}

const Container =styled.div`
height:100vh;
width:100vw;
display: flex;
flex-direction:column;
justify-content: center;
gap:1rem;
align-items: center;
.container{
  height: 90vh;
  width:95vw;
  background-color: red;
  display:grid;
  grid-template-columns: 25% 75% ;
  @media screen and (min-width:720px) and (max-width:1080px)
  {
    grid-template-columns: 35% 65%;

  }
}
`;
export default Chat
