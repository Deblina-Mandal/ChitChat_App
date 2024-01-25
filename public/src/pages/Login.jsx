import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/chat1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        // Incorrect password handling, for example, showing an error of toast
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        // If the password is correct, perform the necessary actions
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = (event) => {
    const { password, username } = values;

    if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }

    if (username.length === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    }

    // If all validations pass, submit the registration form

    // toast.success("Login successful !", toastOptions);
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <FormContainer>
        <ToastContainer />
        <div className="total">
          <form onSubmit={(event) => handleSubmit(event)}>
          
              <div className="brand">
                <img src={Logo} alt="Logo" />
                <div className="brandname">Chit-Chat</div>
              </div>

              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />

              <button type="submit">Log In</button>

              <span>
                Don't have an account? <Link to="/register"> Register </Link>
              </span>
            
          </form>
        </div>
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
  background-color: #09427a;

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
  .total {
    width: 400px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20px 10px #8accef;
    border-radius: 2rem;
    form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      background-color: #ffffffe8;
      /* #c5e7f488; */
      border-color: black;
      border-radius: 2rem;
      padding: 3rem 3rem;
      height: 450px;
      width: 400px;

      .brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        justify-content: center;
        padding-right: 1rem;
        img {
          height: 5rem;
        }
        .brandname {
          color: black;
          text-transform: uppercase;
          font-weight: bold;
          font-family: "Times New Roman", Times, serif;
          font-size: 30px;
        }
      }

      input {
        background-color: transparent;
        padding: 0.8rem;
        border: 0.2rem solid #2165eefd;
        border-radius: 0.4rem;
        color: black;
        width: 100%;
        font-size: 0.9rem;
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
        font-size: 0.9rem;
        a {
          color: #4e0eff;
          font-weight: bold;
          text-decoration: none;
        }
      }
    }
  }

  /* YET TO BE MADE RESPONSIVE */
`;

export default Login;
