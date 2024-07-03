import ListBikesPage from "../Pages/ListBikesPage";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  select,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";
import React from "react";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const userMock = {
  id: "428e75c3-418e-4d5d-867a-7db7e44c5ce0",
  name: "Dani",
  email: "malu@email.com",
  address: {
    id: "19c85b2c-7133-405b-b882-5c3b17f19ee6",
    street: "Passo do hilário",
    number: 666,
  },
};

const bikeMock = [
  {
    id: 1,
    model: "Aro 12",
    price: 100,
    brand: "Bike 1",
    marches: 1,
    img: "https://i.imgur.com/q3n3g6a.jpg",
    categorys: ["mountain"],
  },
];

const orderMock = {
  user_id: "428e75c3-418e-4d5d-867a-7db7e44c5ce0",
  address_id: "19c85b2c-7133-405b-b882-5c3b17f19ee6",
  payment: {
    type: "card",
    installments: "2",
    totalAmount: 800,
    paymentDate: null,
    dueDate: null,
  },
  products: [
    {
      id: "d60ceeb5-7db2-4626-9da7-c682757de047",
      quantity: 1,
      price: 800,
    },
  ],
};

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
      <ListBikesPage />
    </Router>
  );

describe("ListBikesPage", () => {
  it("renders loading when bikes list is empty", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, []);
    //renderiza o componente de listBikesPage
    renderComponent();

    //espera o loading inicial
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });

  it("renders bikes list when bikes list is not empty", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);

    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //espera o carregamento da lista de bikes
    await expect(screen.getByText("Bike 1")).toBeInTheDocument();
  });

  it("renders shopping cart", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);

    //renderiza o componente de listBikesPage
    renderComponent();
    //espera a tela de loading
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    //espera o carregamento da lista de bikes
    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click no botão de abrir o carrinho
    fireEvent.click(screen.getByTestId("cart"));

    //espera o carrinho abrir
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });
  });

  it("add item from cart", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });
  });

  it("remove item from cart", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));

    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("remove"));

    waitFor(() => {
      expect(
        screen.getByText("Produto removido do carrinho!")
      ).toBeInTheDocument();
    });
  });

  it("render make order modal", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));

    await expect(screen.getByText("Finalize sua compra")).toBeInTheDocument();
  });

  it("return the correct address of the user", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    mock.onGet("http://localhost:3003/user/profile").reply(200, userMock);
    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));

    //confere se o endereço está correto
    await expect(screen.getByText("Passo do hilário 666")).toBeInTheDocument();
  });

  it("calculate the total of the order", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));

    //confere se o total do pedido está correto
    await expect(
      screen.getByText("Total do pedido: R$100,00")
    ).toBeInTheDocument();
  });

  it("renders the correct form for bill payment", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);

    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));

    //confere se o total do pedido está correto
    await expect(
      screen.getByText("Informe o método de pagamento:")
    ).toBeInTheDocument();

    //seleciona o tipo de pagamento boleto
    const select = screen.getByRole("combobox"); //ARIA (Accessible Rich Internet Applications) fornece significado semântico aos elementos da web, auxiliando na acessibilidade e nos testes.
    await userEvent.selectOptions(select, "bill");

    //confere se o form correto foi renderizado
    await expect(screen.getByText("Data de pagamento")).toBeInTheDocument();
    await expect(screen.getByText("Data de vencimento")).toBeInTheDocument();
  });

  it("renders the correct form for card payment", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);

    //renderiza o componente de listBikesPage
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));

    //confere se o total do pedido está correto
    await expect(
      screen.getByText("Informe o método de pagamento:")
    ).toBeInTheDocument();

    //seleciona o tipo de pagamento boleto
    const select = screen.getByRole("combobox"); //ARIA (Accessible Rich Internet Applications) fornece significado semântico aos elementos da web, auxiliando na acessibilidade e nos testes.
    await userEvent.selectOptions(select, "card");

    //confere se o form correto foi renderizado
    await expect(screen.getByTestId("installments")).toBeInTheDocument();
  });

  it("make the order with valid data", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    //mocka a requisição de criar pedido
    mock.onPost("http://localhost:3003/order/make").reply(200, [orderMock]);

    //renderiza o componente de listBikesPage
    render(
      <Router>
        <ListBikesPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));
    fireEvent.click(screen.getByText("Finalizar"));

    //verifica se o pedido foi criado
    await waitFor(() => {
      expect(
        screen.getByText(
          "Pedido realizado com sucesso, confira em meus pedidos!"
        )
      ).toBeInTheDocument();
    });
  });

  it("make the order with invalid data", async () => {
    mock.onGet("http://localhost:3003/bike").reply(200, bikeMock);
    //mocka a requisição de criar pedido
    mock.onPost("http://localhost:3003/order/make").reply(400, []);

    //renderiza o componente de listBikesPage
    render(
      <Router>
        <ListBikesPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    await expect(screen.getByText("Bike 1")).toBeInTheDocument();

    //click pra abrir o detalhe do produto
    fireEvent.click(screen.getByTestId("card"));
    await expect(
      screen.getByText("Detalhes Bike 1 Aro 12")
    ).toBeInTheDocument();

    //click no botão de comprar
    fireEvent.click(screen.getByTestId("buy"));
    //aguardar toast de sucesso
    waitFor(() => {
      expect(
        screen.getByText("Produto adicionado ao carrinho!")
      ).toBeInTheDocument();
    });

    //clica no botão de fechar a modal
    fireEvent.click(screen.getByTestId("close"));

    //abre o carrinho
    fireEvent.click(screen.getByTestId("cart"));
    waitFor(() => {
      expect(screen.getByText("Carrinho 🛒")).toBeInTheDocument();
    });

    //abre a modal de finalizar compra
    fireEvent.click(screen.getByText("Finalizar Compra"));
    fireEvent.click(screen.getByText("Finalizar"));

    //verifica se o pedido não foi criado
    await waitFor(() => {
      expect(
        screen.getByText(
          'Erro ao realizar o pedido, tente novamente'
        )
      ).toBeInTheDocument();
    });
  });
});
