import styled from '@emotion/styled'
import { css, ThemeProvider } from '@emotion/react'

function App() {
   // const state = 'red'
   return (
      <ThemeProvider
         theme={css`
            background-color: red;
         `}
      >
         <div>
            <h1>Hello</h1>
            <Button>
               <Span>Button</Span>
            </Button>
         </div>
      </ThemeProvider>
   )
}
const Span = styled.div`
   color: red;
`
const Button = styled.button`
   padding: 32px;
   background-color: ${({ props }) => props || 'blue'};
   font-size: 24px;
   border-radius: 4px;

   font-weight: bold;
   &:hover {
      color: white;
   }
   ${Span} {
      color: white;
   }
`

export default App
