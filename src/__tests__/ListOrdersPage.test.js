import ListOrdersPage from "../Pages/ListOrdersPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import React from "react";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import { formatDate } from "../utils/formatDate";

const orderMock = [
  {
    id: "3bfdd08c-1187-48c1-99e8-6f9e7cf936e2",
    user_id: "428e75c3-418e-4d5d-867a-7db7e44c5ce0",
    created_at: "2024-06-24T20:24:11.000Z",
    address_id: "19c85b2c-7133-405b-b882-5c3b17f19ee6",
    products: [
      {
        id: "d60ceeb5-7db2-4626-9da7-c682757de047",
        quantity: 1,
        price: 800,
        color: "blue",
        marches: 4,
        brand: "Caloi",
        model: "Aro 20",
        img: "https://github.com/Danielle-Kensy/eBikes/blob/main/src/img/b1.png?raw=true",
      },
    ],
    payment: {
      id: "3bfdd08c-1187-48c1-99e8-6f9e7cf936e2",
      state: "paid",
      type: "bill",
      paymentDate: "2024-06-09T03:00:00.000Z",
      dueDate: "2024-06-07T03:00:00.000Z",
      installments: null,
      totalAmount: 800,
      order_id: "56adfd8f-94c9-4519-ab17-09126f88519b",
    },
    address: {
      id: "19c85b2c-7133-405b-b882-5c3b17f19ee6",
      street: "Passo do hilário",
      number: 666,
    },
  },
];

let mock;

beforeAll(() => {
  // Configura o mock do axios
  mock = new AxiosMockAdapter(axios);
});

afterEach(() => {
  // Reseta o mock configurado após cada teste
  mock.reset();
});

afterAll(() => {
  // Reseta a requisição após todos os testes
  mock.restore();
});

const renderComponent = () =>
  render(
    <Router>
      <ListOrdersPage />
    </Router>
  );

describe("ListOrdersPage", () => {
  it("renders loading when orders list is empty", async () => {
    mock.onGet("http://localhost:3003/order/000").reply(200, []);
    //renderiza a página de listagem de pedidos
    renderComponent();

    //confere se está renderizando o loading
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });

  it("renders orders list when orders list is not empty", async () => {
    mock
      .onGet("http://localhost:3003/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0")
      .reply(200, orderMock);

    //renderiza o componente de
    renderComponent();

    //espera o carregamento da lista de pedidos
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //busca se o pedido está sendo renderizado
    await expect(
      screen.getByText("Pedido feito em 24/06/2024")
    ).toBeInTheDocument();
  });

  it("renders order details when clicking on order card", async () => {
    mock
      .onGet("http://localhost:3003/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0")
      .reply(200, orderMock);

    //renderiza a página de listagem de pedidos
    renderComponent();

    //espera o carregamento da lista de pedidos
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //busca se o pedido está sendo renderizado
    await expect(
      screen.getByText("Pedido feito em 24/06/2024")
    ).toBeInTheDocument();

    //clique no botão de detalhes do pedido
    fireEvent.click(screen.getByText("ver detalhes"));

    //confere se a modal com detalhes do pedido está aberta
    expect(screen.getByText("Detalhes do pedido")).toBeInTheDocument();
  });

  it("renders correct date format", async () => {
    mock
      .onGet("http://localhost:3003/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0")
      .reply(200, orderMock);

    //renderiza a página de listagem de pedidos
    renderComponent();

    //espera o carregamento da lista de pedidos
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //busca se o pedido está sendo renderizado
    await expect(
      screen.getByText("Pedido feito em 24/06/2024")
    ).toBeInTheDocument();

    //clique no botão de detalhes do pedido
    fireEvent.click(screen.getByText("ver detalhes"));

    //confere se a modal com detalhes do pedido está aberta
    expect(screen.getByText("Detalhes do pedido")).toBeInTheDocument();

    //confere se a data está sendo renderizada corretamente
    await expect(
      screen.getByText("Data da compra: 24/06/2024")
    ).toBeInTheDocument();
  });

  it("renders order products when clicking on order card", async () => {
    mock
      .onGet("http://localhost:3003/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0")
      .reply(200, orderMock);

    //renderiza a página de listagem de pedidos
    renderComponent();

    //espera o carregamento da lista de pedidos
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //busca se o pedido está sendo renderizado
    await expect(
      screen.getByText("Pedido feito em 24/06/2024")
    ).toBeInTheDocument();

    //clique no botão de detalhes do pedido
    fireEvent.click(screen.getByText("ver detalhes"));

    //confere se a modal com detalhes do pedido está aberta
    expect(screen.getByText("Detalhes do pedido")).toBeInTheDocument();

    //confere se a lista de produtos está sendo renderizada
    await expect(screen.getByText("1 x Aro 20 - R$ 800,00"));
  });

  it("renders order status correctly", async () => {
    mock
      .onGet("http://localhost:3003/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0")
      .reply(200, orderMock);

    //renderiza a página de listagem de pedidos
    renderComponent();

    //espera o carregamento da lista de pedidos
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //busca se o pedido está sendo renderizado
    await expect(
      screen.getByText("Pedido feito em 24/06/2024")
    ).toBeInTheDocument();

    //confere se o status do pedido está sendo renderizado corretamente
    await expect(screen.getByTestId("paid"));
  });

  it("close modal when clicking on close button", async () => {
    mock
      .onGet("http://localhost:3003/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0")
      .reply(200, orderMock);

    //renderiza a página de listagem de pedidos
    renderComponent();

    //espera o carregamento da lista de pedidos
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //busca se o pedido está sendo renderizado
    await expect(
      screen.getByText("Pedido feito em 24/06/2024")
    ).toBeInTheDocument();

    //clique no botão de detalhes do pedido
    fireEvent.click(screen.getByText("ver detalhes"));

    //confere se a modal com detalhes do pedido está aberta
    expect(screen.getByText("Detalhes do pedido")).toBeInTheDocument();

    //clique no botão de fechar
    fireEvent.click(screen.getByTestId("close"));

    //confere se a modal com detalhes do pedido está fechada
    waitFor(() => {
      expect(screen.queryByText("Detalhes do pedido")).toBeInTheDocument();
    });
  });
});
