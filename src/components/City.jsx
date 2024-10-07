/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'


const StyledCity = styled.div`
  $margin_bottom:${props => props.margin_bottom};
  color: ${({ $light, theme }) => $light ? theme.color.light : theme.color.dark};
  font-size: 3rem;
`

StyledCity.defaultProps = {
  $margin_bottom: "2rem",
};


const City = (props) => {

  const { ...rest } = props

  return (
    <StyledCity {...rest}></StyledCity>
  )
}

export default City