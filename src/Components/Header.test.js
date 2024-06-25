import Header from "../Components/Header";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import React from "react";

//CASO LOGOUT
describe(Header, () => {
    it ("render logout button", () => {
      render(<Router><Header /></Router>);
      //verifica se o botão de logout foi renderizado
      const logoutButton = screen.getByText("Logout");
      expect(logoutButton).toBeInTheDocument();
    });
  
    it("logout", () => {
      //renderiza o componente de header que possui o botão de logout
      render(<Router><Header /></Router>);
      //encontra o botão de logout
      const logoutButton = screen.getByText("Logout");
      //clica no botão de logout
      fireEvent.click(logoutButton);
  
      //aguarda até que o texto da tela de login apareça
      waitFor(() => expect(screen.getByText("eBikes")).toBeInTheDocument());
    }); 
  });