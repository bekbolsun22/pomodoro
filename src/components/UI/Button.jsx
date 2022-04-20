import React from 'react'
import styled from '@emotion/styled'

export const Button = (props) => {
   return (
      <StyledButton type="button" {...props}>
         {props.children}
      </StyledButton>
   )
}

const StyledButton = styled.button`
   width: ${({ w }) => w || ''};
   height: ${({ h }) => h || ''};
   padding: ${({ p }) => p || ''};
   margin: ${({ m }) => m || ''};
`
