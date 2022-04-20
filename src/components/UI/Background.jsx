import React from 'react'
import styled from '@emotion/styled'

export const Background = (props) => {
   return <BackgroundColor {...props} />
}

const BackgroundColor = styled.div`
   height: 100%;
   width: 100%;
   z-index: -10;
   position: absolute;
   top: 0;
   left: 0;
   background-color: ${({ bgColor }) => bgColor || 'red'};
   transition: background-color ease-in 0.4s;
`
