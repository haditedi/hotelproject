import React from "react"
import styled from "@emotion/styled"

const ContCard = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  div {
    width: 50vw;
  }
`
const Desc = styled.div`
  margin: 20px;
  padding: 10px;
`

const card = props => {
  return (
    <ContCard>
      {props.image}
      <Desc>{props.children}</Desc>
    </ContCard>
  )
}

export default card
