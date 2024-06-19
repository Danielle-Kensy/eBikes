import React from 'react'
import { useState } from "react"
import axios from 'axios';
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import { setId, setToken } from '../utils/localStorage'
import bike from "../img/bike.png"

const Buttons = styled.div`
    justify-content: space-around;
    width: 500px;
    display: flex;
`

const LogoFrame = styled.img`
   // border-radius: 500px;
    width: 13vw;
    height: 25vh;
    position: absolute;
    top: 10%;
    left: 43%;
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 330px;
    background-color: #F7FFF6;
    border: 10px solid #93B48B;
    border-radius: 40px;
`
const Input = styled.input`
    width: 60%;
    margin-bottom: 10px;
`

const LoginPage = () => {

    //navegação

    const history = useHistory();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = ({ target }) => {
        setEmail(target.value);
    }

    const onChangePassword = ({ target }) => {
        setPassword(target.value);
    }

    const onSubmitLogin = () => {

        const URL = `http://localhost:3003/user/login`
       
        const body = {
            email,
            password
        }

        axios
        .post(URL, body)
            
        .then(({ data }) => {
            setToken(data.token);
            setId(data.id);
            history.push("/ListBikes")
            console.log(data);
        })

        .catch((err) => {
            console.log(err)
            alert("Usuário ou Senha incorretos")
        });
    }

    return (
        <>
        <LogoFrame src={bike} alt="logo" />

        <FormWrapper>
            <h1>eBikes</h1>
            <form>
                <Input
                    placeholder={"Email"}
                    required
                    type={"email"}
                    onChange={onChangeEmail}
                    value={email}
                />
                <Input
                    placeholder={"Senha"}
                    required
                    type={"password"}
                    onChange={onChangePassword}
                    value={password}
                />
            </form>
            <Buttons>
                {/* <button onClick={goToHomePage}>Voltar</button> */}
                <button onClick={onSubmitLogin}>Entrar</button>
            </Buttons>
        </FormWrapper>
        </>
    )
}

export default LoginPage
