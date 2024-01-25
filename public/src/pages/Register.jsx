import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/chat1.png";
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
    // console.log(handleValidation());
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
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
        </div>
      </FormContainer>
    </div>
  );
}
const FormContainer = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .total {
    width: 100%;
    max-width: 400px;
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 20px 10px #8accef;
    border-radius: 2rem;

    form {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      background-color: #ffffffe8;
      /* border-color: black; */
      border-radius: 2rem;
      /* padding: 2.5rem 3rem; */
      padding: 10% 10%;
      width: 100%;
      max-width: 400px;
      height: 550px;

      .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 1rem;
        img {
          height: 4.5rem;
        }
        .brandname {
          color: black;
          text-transform: uppercase;
          font-weight: bold;
          font-family: "Times New Roman", Times, serif;
          font-size: 24px;
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
  /* @media (max-height: 498px) {
    .total {
     height:92%;
     width:92%;
      form {
        height:100%;
        width:100%
        padding-top: 5%;
        .brand {
       
        img {
          height: 3rem;
        }
        .brandname {
          color: black;
          text-transform: uppercase;
          font-weight: bold;
          font-family: "Times New Roman", Times, serif;
          font-size: 24px;
        }
      }

      }
    }
  } */

  /* @media (max-width: 480px) {
    .total {
      form {
        padding: 1rem;
        .brand {
          .brandname {
            font-size: 18px;
          }
        }
      }
    }
  } */
`;

export default Register;
