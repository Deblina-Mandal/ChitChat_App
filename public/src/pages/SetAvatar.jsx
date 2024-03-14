
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/temple-loader.gif";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

 const fetchData = async () => {
    const data = [];

    for (let i = 0; i < 4; i++) {
      try {
        const response = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`,
          { responseType: "arraybuffer" } 
        );

        const buffer = Buffer.from(response.data);
        data.push(buffer.toString("base64"));
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
    };
    checkUser();
  }, []);
  

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {

      try {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        console.log("User ID:", user._id);
  
        const response = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        console.log("Response:", response.data);
        if (response.data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = response.data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate('/');
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
  
        
      } catch (error) {
        console.error("Error setting profile picture:", error);
        toast.error("Failed to set profile picture", toastOptions);
      }
    }
  };
  

  return (
    <>
      <div>
        {
        isLoading ? <Container>
          <img src={loader} alt="loader" className="loader"/>
        </Container>:(

        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">

            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
        )
      }
        <ToastContainer />
      </div>

    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;

  background-color: #09427a;
  /* #373770; */
  /* #131324; */
  height: 100vh;
  width: 100vw;
  .loader {
    height: 20%;
    width: 10%;
    /* max-inline-size: 100%; */

  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;


    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #2492ff;
    }
  }
`;
