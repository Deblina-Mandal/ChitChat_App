import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo192.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme:"dark",
};

useEffect(() => {
  if(localStorage.getItem('chat-app-user')){
   navigate("/");
  }
}, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(handleValidation());
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status===false){
        toast.error(data.msg,toastOptions)
      }
      if (data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/");
      }
      
    }
  };

  const handleValidation = (event) => {
    const { password, confirmPassword, username, email } = values;

    if (password === "") {
      toast.error("Password is required.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    }

    if (confirmPassword === "") {
      toast.error("Confirm password is required.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    }
    if (username === "") {
      toast.error("Username is required.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    }
    if (email === "") {
      toast.error("Email is required.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    }
    if (username.length < 3) {
      toast.error("Username should be equal or more than 3 characters.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or more than 8 characters.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    }

    // If all validations pass, submit the registration form
    
    toast.success("Registration successful !", {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    return true;
  
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <FormContainer>
        <ToastContainer />
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chit-Chat</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>

          <span>
            Already have an account? <Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
    </div>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #fae8f7; */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #c5e7f488;
    border-color: black;
    border-radius: 2rem;
    padding: 3rem 5rem;

    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
        height: 5rem;
      }
      h1 {
        color: black;
        text-transform: uppercase;
      }
    }

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.2rem solid #2165eefd;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.2rem solid #4e8eff;
        outline: none;
      }
    }
    button {
      background-color: #1133f3;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e8eff;
      }
    }
    span {
      color: black;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default Register;
