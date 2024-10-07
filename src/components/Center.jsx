import React from 'react'
import styled from 'styled-components'

const StyledCenter = styled.div`
  width: ${({ $size }) => $size};
  aspect-ratio: 1/1;
  background: ${({ $bg }) => $bg};
  border: ${({ $border }) => $border};
  border-radius:50%;
  z-index: 999;
`

StyledCenter.defaultProps = {
  $size: "15px",
  $bg: "#848484",
  $border: "2px solid #fff"
}

const Center = (props) => {

  const { ...rest } = props
  return (
    <StyledCenter {...rest} />
  )
}

export default Center