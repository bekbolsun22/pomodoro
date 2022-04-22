import React from 'react'
import styled from '@emotion/styled'

export const Modal = (props) => {
   return <ModalView {...props}>{props.children}</ModalView>
}

const ModalView = styled.div`
   background-color: #ffffff;
   border-radius: 6px;
   -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
`
