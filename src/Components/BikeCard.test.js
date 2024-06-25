import BikeCard from "./BikeCard";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe(BikeCard, () => {
  it("show product details", () => {
    //mockando a prop necessária para o componente de bikeCard
    const mockBike = {
      id: 1,
      model: "Bike 1",
      price: 100,
      brand: "Bike 1",
      marches: 1,
      img: "https://i.imgur.com/q3n3g6a.jpg",
      categorys: ["Category 1", "Category 2"],
    };
    //renderiza o componente de bikeCard
    render(<BikeCard bike={mockBike} />);

    waitFor(() => {
      expect(screen.getByText("Comprar")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Comprar"));

    waitFor(() => {
      expect(screen.getByText("Detalhes Bike 1")).toBeInTheDocument();
    });
  });

  it("close product details", () => {
    const mockBike = {
      id: 1,
      model: "Bike 1",
      price: 100,
      brand: "Bike 1",
      marches: 1,
      img: "https://i.imgur.com/q3n3g6a.jpg",
      categorys: ["Category 1", "Category 2"],
    };

    render(<BikeCard bike={mockBike} />);

    waitFor(() => {
      expect(screen.getByText("Comprar")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Comprar"));

    waitFor(() => {
      expect(screen.getByText("Detalhes Bike 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cancelar"));

    waitFor(() => {
      expect(screen.queryByText("Detalhes Bike 1")).toBeNull();
    });
  });
});
