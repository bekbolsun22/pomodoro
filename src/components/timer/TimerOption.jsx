import React from 'react'
import styled from '@emotion/styled'

export const TimerOption = ({ isActive, mode, stage, onSwitchMode }) => {
   return (
      <OptionButton
         type="button"
         onClick={() => onSwitchMode(stage)}
         isActive={isActive}
      >
         <span>{mode}</span>
      </OptionButton>
   )
}

const OptionButton = styled.button`
   transition: backgound font-family font-weight ease 0.5s;
   border: none;
   border-radius: 4px;
   font-size: 16px;
   padding: 2px 12px;
   height: 28px;
   cursor: pointer;
   font-family: ${({ isActive }) =>
      isActive ? `'Nunito', sans-serif` : `'Open Sans', sans-serif`};
   font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
   background: ${({ isActive }) => (isActive ? 'rgba(0, 0, 0, 0.15)' : 'none')};
   color: white;
   opacity: 1;
   & span {
      font-weight: ${({ isActive }) => (isActive ? 700 : 300)};
   }
   &:active {
      position: relative;
      top: 2px;
   }
`
