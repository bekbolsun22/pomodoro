import styled from '@emotion/styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
   const navigate = useNavigate()
   const navigateToHomePageHandler = () => {
      navigate('/')
   }
   return (
      <BackgroundImage>
         <h1>404</h1>
         <h2>Page Not Found</h2>
         <button onClick={navigateToHomePageHandler}>Return to Home</button>
      </BackgroundImage>
   )
}
const BackgroundImage = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045);
   background-size: 400%, 400%;
   animation: animate-background 10s infinite ease-in-out;
   @keyframes animate-background {
      0% {
         background-position: 0 50%;
      }
      50% {
         background-position: 100% 50%;
      }
      100% {
         background-position: 0 50%;
      }
   }
   & h1 {
      color: #ffffff28;
      font-size: 500px;
      font-family: 'ArialRounded';
   }
   & h2 {
      color: white;
      position: relative;
      bottom: 300px;
      font-family: 'ArialRounded';
      font-size: 60px;
   }
   & button {
      border: none;
      outline: none;
      padding: 15px 25px;
      position: relative;
      bottom: 300px;
      border-radius: 4px;
      font-family: 'ArialRounded';
      opacity: 0.8;
      cursor: pointer;
      margin-top: 15px;
      &:hover {
         opacity: 1;
      }
   }
`
export default NotFound
