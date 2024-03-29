import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ThreeDotsImage from "../assets/three-dots.png";
import { Link } from "react-router-dom";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Clicked outside the dropdown, close it
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add click event listener to window to handle clicks outside the dropdown
    window.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <div className="dropdown" ref={dropdownRef}>
        <img
          src={ThreeDotsImage}
          alt="Three Dots"
          onClick={toggleDropdown}
          className="three-dots-image"
        />
        {isOpen && (
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="/SetAvatar"> Change profile photo </Link>
            <a className="dropdown-item" href="#">
              Search
            </a>
            <a className="dropdown-item" href="#">
              Settings
            </a>
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  /* Dropdown.css */

  .dropdown-container {
    position: relative;
    display: inline-block;
  }

  .three-dots-image {
    cursor: pointer;
  }

  .dropdown-menu {
    display: block;
    position: absolute;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .dropdown-item {
    color: black;
    text-decoration: none;
    display: block;
    padding: 8px 16px;
    transition: background-color 0.3s;
  }

  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
`;
