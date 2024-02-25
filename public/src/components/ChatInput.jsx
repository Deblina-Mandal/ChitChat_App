import React, { useState, useRef } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const pickerRef = useRef(null);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // const handleEmojiClick = (event, emoji) => {
  //   console.log(emoji);
  //   let message = msg;
  //   message += emoji.emoji;
  //   setMsg(message);
  // };
  const handleEmojiClick = (event, emoji) => {
    let message = msg + emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {/* && pickerRef.current */}
          {showEmojiPicker && (
            <Picker
              className="emoji-picker-react"
              ref={pickerRef}
              onEmojiClick={(emoji, event) => handleEmojiClick(event, emoji)}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <textarea
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #090d15;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.3rem;
  /* height:5rem; */
  gap: 0.2rem;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9186f3;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -480px;
        left: -10px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .emoji-picker-react .emoji-scroll-wrapper {
    &::-webkit-scrollbar {
      width: 5px;
      background-color: #080420;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #9186f3;
    }
  }

  .input-container {
    width: 100%;
    height: 70%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    /* background-color: #ffffff34; */

    textarea {
      width: 90%;
      height: 100%;
      background-color: #ffffff34;
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 1rem;
      font-size: 1rem;
      resize: none;
      overflow: hidden;

      &::-webkit-scrollbar {
        width: 0.4rem;
        overflow: hidden;
        &-thumb {
          background-color: #ffffff39;
          border-radius: 1rem;
          overflow: hidden;
        }
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #ffffff39;
        border-radius: 10px;
        overflow: hidden;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        overflow: hidden;
        -webkit-box-shadow: inset 0 0 6px #ffffff39;
      }
      &::selection {
        background-color: #9186f3;
        overflow: hidden;
      }

      &:focus {
        outline: none;
        outline: none;
        box-shadow: 0 0 0 2px #5850bb;
        overflow: hidden;
      }
    }

    button {
      padding: 0.3rem 1rem;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #5850bb;
      border: none;

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
