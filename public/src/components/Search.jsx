import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
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
  justify-content: flex-end; /* Align to the right side */
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #aee2ed;
  /* background-color: #3697ab; */
  border: none;
  cursor: pointer;

  svg {
    font-size: 1rem;
    /* color: #ebe7ff; */
    margin-left: auto; /* Move the icon to the right */
  }
`;
