import React from 'react'
import styled from '@emotion/styled'
import checkmark from '../../assets/icons/checkmark.svg'
import graph from '../../assets/icons/graph.svg'
import settings from '../../assets/icons/settings.svg'
import user from '../../assets/icons/user.svg'

export const TimerHeader = ({ onChangeVisible }) => {
   return (
      <Header>
         <Title>
            <img src={checkmark} alt="checkmark" />
            Pomofocus
         </Title>
         <ButtonsBlock>
            <SettingButton>
               <img src={graph} alt="graph" />
               Report
            </SettingButton>
            <SettingButton onClick={onChangeVisible}>
               <img src={settings} alt="settings" />
               Setting
            </SettingButton>
            <SettingButton>
               <img src={user} alt="user" />
               Login
            </SettingButton>
         </ButtonsBlock>
      </Header>
   )
}

const Header = styled.header`
   padding: 12px 12px;
   max-width: 640px;
   margin: auto;
   display: flex;
   justify-content: space-between;
   align-items: center;
`

const Title = styled.div`
   width: 132px;
   color: white;
   font-size: 20px;
   display: flex;
   align-items: center;
   font-family: 'Nunito', sans-serif;
   & img {
      width: 25px;
      height: 25px;
      margin-right: 2px;
   }
`

const ButtonsBlock = styled.span`
   display: flex;
`
const SettingButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 4px;
   cursor: pointer;
   font-family: 'Varela Round', sans-serif;
   opacity: 0.8;
   background: rgba(255, 255, 255, 0.2);
   margin-left: 10px;
   font-size: 13px;
   padding: 5px 12px;
   min-width: 70px;
   border: none;
   color: white;
   &:active {
      position: relative;
      top: 2px;
   }
   & img {
      width: 22px;
      height: 22px;
      margin-right: 2px;
   }
   &:hover {
      opacity: 1;
   }
`
