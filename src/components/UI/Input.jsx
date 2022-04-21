import styled from '@emotion/styled'
import React from 'react'

export const Input = (props) => {
   return <Styledinput {...props} />
}

const Styledinput = styled.input`
   outline: none;
   border: none;
   border-radius: ${({ borderRds }) => borderRds || ''};
   background-color: ${({ bgColor }) => bgColor || ''};
   font-size: ${({ fontSize }) => fontSize || ''};
   margin: ${({ m }) => m || ''};
   padding: ${({ p }) => p || ''};
   color: ${({ color }) => color || ''};
   width: ${({ w }) => w || ''};
   height: ${({ h }) => h || ''};
`
