import LoginPage from "./LoginPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import React from "react";

//CASO LOGIN
//describe inicia o teste
describe(LoginPage, () => {
  //it inicia os testes individuais no componente
  it("render loginPage form", () => {
    //gera uma versão fake do componente
    render(<Router><LoginPage /></Router>);

    //pegando o input pelo id de teste definido
    const mailInput = screen.getByTestId("mail");
    // Verifica se o input de email foi renderizado
    expect(mailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId("password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("login with valid data", () => {
    render(<Router><LoginPage /></Router>);
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

  it("login with invalid data", () => {
    render(<Router><LoginPage /></Router>);
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
