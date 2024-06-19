import React from 'react'
import './App.css';
import GlobalStyle from './globalStyle';
import Router from './Routes/Router';

function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <Router/>
    </div>
  );
}

export default App;
