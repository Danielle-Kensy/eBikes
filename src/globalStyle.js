import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    /* margin: 30px 0; */
    padding: 0;
  }

  button {
    border: none;
    color: white;
    background-color: #93B48B;
    font-size: 16px;
    margin-bottom: 14px;
    border-radius: 15px;
    width: 120px;
    height: 45px;

    &:hover{
      cursor: pointer;
      background-color: #4F7142;
    }
  }

  h1, h2{
    color: #8491A3;
    text-align: center;
    font-weight: 800;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
  }

  input {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    padding: 4px 8px;
    border-width: 1px;
    border-color: gray;
  }

  select {
    width: 518px;
    height: 40px;
    border-radius: 10px;
    padding: 4px 8px;
    border-width: 1px;
    margin: 0 0 15px 0;
  }
`

export default GlobalStyle