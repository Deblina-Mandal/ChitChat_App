import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

export default function SearchText() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/");
    };
  return (
    
    <Button onClick={handleClick}>
        <IoIosSearch />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  background-color: azure;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.8rem;
    
  }
`;
