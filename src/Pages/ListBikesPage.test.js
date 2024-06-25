import ListBikesPage from "./ListBikesPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockAxios from "jest-mock-axios";
import { MemoryRouter as Router } from "react-router-dom";
import React from "react";

afterEach(() => {
  // Limpa todas as requisições mockadas após cada teste
  mockAxios.reset();
});

//CASO LISTAR BIKES
describe(ListBikesPage, () => {
  it("renders loading when bikes list is empty", () => {
    //renderiza o componente de listBikesPage
    render(
      <Router>
        <ListBikesPage />
      </Router>
    );

    //espera o loading inicial
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });

  it("renders bikes list when bikes list is not empty", () => {
    //mockando a requisição de dados da api
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: [
        {
          id: 1,
          model: "Bike 1",
          price: 100,
          brand: "Bike 1",
          marches: 1,
          img: "https://i.imgur.com/q3n3g6a.jpg",
        },
      ],
    });

    //renderiza o componente de listBikesPage
    render(
      <Router>
        <ListBikesPage />
      </Router>
    );

    //espera o carregamento dos dados
    expect(screen.getByLabelText("loading")).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByText("Bike 1")).toBeInTheDocument();
    });
  });
});
