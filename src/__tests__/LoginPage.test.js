import LoginPage from "../Pages/LoginPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import React from "react";

const renderComponent = () => render(<Router><LoginPage /></Router>);

//describe é o nosso switch de teste que comporta todos os testes individuais no componente
describe('LoginPage', () => {
  //it inicia os testes individuais no componente
  it("render loginPage form", () => {
    //gera uma versão fake do componente
    renderComponent()

    //pegando o input pelo id de teste definido
    const mailInput = screen.getByTestId("mail");
    // Verifica se o input de email foi renderizado
    expect(mailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId("password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("login with valid crendentials", () => {
    renderComponent()
    const mailInput = screen.getByTestId("mail");
    const passwordInput = screen.getByTestId("password");

    //inserindo dados válidos
    fireEvent.change(mailInput, { target: { value: "malu@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    //clicando no botão de login
    const loginButton = screen.getByText("Entrar");
    fireEvent.click(loginButton);

    //verificando se o componente de header foi renderizado
    waitFor(() => expect(screen.getByText("eBikes Express")).toBeInTheDocument());
  });

  it("login with invalid password", () => {
    renderComponent()
    const mailInput = screen.getByTestId("mail");
    const passwordInput = screen.getByTestId("password");

    //inserindo dados inválidos
    fireEvent.change(mailInput, { target: { value: "malu@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "666" } });

    //clicando no botão de login
    const loginButton = screen.getByText("Entrar");
    fireEvent.click(loginButton);

    //verificando se o componente de header foi renderizado
    waitFor(() => expect(screen.getByText("Usuário ou Senha incorretos!")).toBeInTheDocument());
  });

  it("login with invalid mail", () => {
    renderComponent()
    const mailInput = screen.getByTestId("mail");
    const passwordInput = screen.getByTestId("password");

    //inserindo dados inválidos
    fireEvent.change(mailInput, { target: { value: "dani@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234567" } });

    //clicando no botão de login
    const loginButton = screen.getByText("Entrar");
    fireEvent.click(loginButton);

    //verificando se o componente de header foi renderizado
    waitFor(() => expect(screen.getByText("Usuário ou Senha incorretos!")).toBeInTheDocument());
  });
});
