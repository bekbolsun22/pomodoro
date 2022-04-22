import React from 'react'
import styled from '@emotion/styled'

export const TimerProgressBar = ({ chart }) => {
   return (
      <ChartStyled>
         <ChartDiv>
            <ChartItem chart={chart} />
         </ChartDiv>
      </ChartStyled>
   )
}

const ChartStyled = styled.div`
   width: 620px;
   height: 1px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 5px auto;
   margin-bottom: 40px;
`
const ChartDiv = styled.div`
   width: 100%;
   height: 1px;
   background-color: rgba(0, 0, 0, 0.1);
`
const ChartItem = styled.div`
   width: ${({ chart }) => `${chart}%`};
   height: 3px;
   background-color: #ffffff;
   border-radius: 100px;
   transition: all 0.3s;
   transform: translateY(-1px);
`
