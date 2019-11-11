import React from 'react';
import CardList from './CardList';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    src: url('Open_Sans/OpenSans-Regular.ttf') format('ttf');
  }

  body {
    font-family: 'Open Sans';
    font-weight" 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

function App() {
  return (
    <div className="app">
      <GlobalStyle />
			<CardList />
    </div>
  );
}

export default App;
