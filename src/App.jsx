// import React from 'react'
import Clock from './components/Clock';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

//theme 存在于所有styled组件中，不存在其他组件中
const theme = {
  primary: '#69c0ff',
  secondary: '#b7eb8f',
  color: {
    dark: '#333',
    light: '#eee',
  },
  clockBackground: {
    dark: `rgba(255, 255, 255, 0.1)`,
    light: `rgba(29, 6, 6, 0.1)`,
  },
};

const backgroundImage = `linear-gradient(to bottom right,${theme.primary},${theme.secondary} 100%)`

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100dvh;
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-shadow: 0 3px 5px rgba(0, 0, 0, 10%);
    background: ${backgroundImage};
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    user-select: none;
    --webkit-user-drag: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;//如果在一行中溢出，自动换到下一行
  max-width: 1200px;
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Clock city={'Sydney'} timezone={10} />
        <Clock city={'China'} timezone={8} />
        <Clock city={'London'} timezone={1} />
        <Clock city={'New York'} timezone={-1} />
      </Container >
    </ThemeProvider>
  )
}

export default App