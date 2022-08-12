import styled from "styled-components"

import { BiCheckShield } from "react-icons/bi"

import { FaCopy, FaInfo, FaSave, FaTimes } from "react-icons/fa"

import { useSelector } from "react-redux"

import { SpinnerCircular } from "spinners-react"


const MiniMessage = () => {

  const { show, icon, content, style } = useSelector((store) => store.messages.miniMessage)

  const iconObject = {

    'ok': <BiCheckShield size="1.2pc" />,

    'copy': <FaCopy size="1.2pc" />,

    'save': <FaSave size="1.2pc" />,

    'info': <FaInfo size="1.2pc" />,

    'times': <FaTimes size="1.2pc" />,

    'loading': <SpinnerCircular size="1.2pc" color="white" secondaryColor="#b3b3b3" />,

  }

  if (!show) { return <></> }

  return (

    <MiniMessageStyle>

      <div className="mini-message" style={style}>

        <div className="mini-icon" style={icon.style}>{iconObject[icon.name]}</div>

        <div className="mini-divider"></div>

        <div className="mini-text" style={content.style}>{content.text}</div>

      </div>

    </MiniMessageStyle>

  )

}

const MiniMessageStyle = styled.div`

  @keyframes slide-mini-message-up{
    0%{bottom: -3pc;}
    100%{bottom: 1pc;}
  }

  position: fixed;
  right: 0;
  left: 0; 
  bottom: 1pc;
  z-index: 550;
  margin: 1pc auto;
  display: none;
  align-items: center;
  justify-content: center;

  display: flex;
  animation: slide-mini-message-up .5s 1;

  div.mini-message{
    background-color: rgb(53, 53, 53);
    color: white;
    fill: white;
    display: flex;
    border-radius: .5pc;

    .mini-divider{
      align-self: stretch;
      width: 1px;
      background-color: #878787;
    }

    .mini-text{
      padding: 1pc;
      font-size: 1pc;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 50vw;
      text-align: center;
    }

    .mini-icon{
      padding: 1pc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

`

export default MiniMessage
