import React, { useState } from "react";
import styled from "styled-components";
import UseGetData from "../Hooks/UseGetDate";
import { UseProtectedPage } from "../Hooks/UsePotectedPage";
import Header from "../Components/Header";
import BikeCard from "../Components/BikeCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FloatButton, Drawer, Modal, Button, Radio, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartCard from "../Components/CartCard";
import UseForm from "../Hooks/UseForm";
import UseGetProtectedData from "../Hooks/UseGetProtected";
import axios from "axios";
import { calculateTotal } from "../utils/calculateTotal";

const ListDiv = styled.div`
  display: flex;
  position: absolute;
  margin-top: 10%;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px 200px;
  column-gap: 90px;
  row-gap: 60px;

  img {
    grid-column: 2;
  }
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  //background-color: red;

  select {
    width: 80%;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 77%;
  height: 100%;
  input {
    margin-bottom: 15px;
  }
  p {
    margin: 0;
    align-self: flex-start;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  &:hover {
    background-color: #4d5e48;
  }
`;

const ListBikesPage = () => {
  UseProtectedPage();

  //dados retornados da API
  const [getBikes] = UseGetData("/bike", {});
  const [getUser] = UseGetProtectedData("user/profile", {});

  const [notify, contextHolder] = notification.useNotification();

  //estados para controle do carrinho
  const [purchaseList, setPurchaseList] = useState([]);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //estados formulário
  const { form, onChange, cleanFields } = UseForm({
    type: "",
    paymentDate: "",
    dueDate: "",
    installments: "",
    totalAmount: "",
  });

  //método que remove item do carrinho
  const removeItemFromCart = (id) => {
    const newPurchaseList = purchaseList.filter((item) => item.id !== id);
    setPurchaseList(newPurchaseList);
    notify.error({
      message: 'Produto removido do carrinho!',
    });
  };

  // Método que adiciona item no carrinho
  const addItemToCart = (bike) => {
    console.log('teste')
    const newPurchaseList = [
      ...purchaseList,
      <CartCard
        bike={bike}
        removeItemFromCart={removeItemFromCart}
        showRemoveButton={true}
        data-testid="card"
      />,
    ];
    setPurchaseList(newPurchaseList);
  };

  //lista de todos as bikes disponíveis
  const bikesList =
    getBikes?.length > 0 &&
    getBikes.map((bike) => {
      return <BikeCard key={bike.id} bike={bike} addItemToCart={addItemToCart} />;
    });

    console.log(bikesList)
    console.log(purchaseList)

  //método para administrar o carrinho
  const onClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsLoading(true);
    //criando objeto do pedido esperado pela requisição
    const order = {
      user_id: getUser?.id ?? null,
      address_id: selectedAddress ?? null,
      payment: {
        type: form?.type ?? null,
        installments: form?.installments !== "" ? form?.installments : null,
        totalAmount: calculateTotal(purchaseList),
        paymentDate: form?.paymentDate !== "" ? form?.paymentDate : null,
        dueDate: form?.dueDate !== "" ? form?.dueDate : null,
      },
      products: purchaseList?.map((item) => ({
        id: item.props.bike?.id ?? null,
        quantity: 1,
        price: item.props.bike?.price ?? null,
      })),
    };
    const URL = `http://localhost:3003/order/make`;

    //requisição para criar pedido
    axios
      .post(URL, order)

      .then(() => {
        setIsLoading(false);
        notify.success({
          message: 'Pedido realizado com sucesso, confira em meus pedidos!',
        });
        setIsModalOpen(false);
        cleanFields();
        setPurchaseList([]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        notify.error({
          message: 'Erro ao realizar o pedido, tente novamente',
        });
      });
  };

  const openModalCloseDrawer = () => {
    setOpen(false);
    setIsModalOpen(true);
  };

  const calculateInstallments = (installments) => {
    return `R$ ${calculateTotal(purchaseList) / installments},00`;
  };

  return (
    <Main>
      {contextHolder}
      <Header />
      <ListDiv>
        {bikesList && bikesList.length > 0 ? (
          <Grid>{bikesList}</Grid>
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        )}
      </ListDiv>
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 94 }}
        icon={<ShoppingCartOutlined />}
        onClick={() => setOpen(true)}
        data-testid="cart"
      />
      <Drawer
        title="Carrinho 🛒"
        onClose={onClose}
        open={open}
        footer={[
          <div key={'footer'}>
            <p>Total: R${calculateTotal(purchaseList)},00</p>
            <StyledButton
              key="back"
              onClick={() => openModalCloseDrawer()}
              style={{ width: "100%" }}
            >
              Finalizar Compra
            </StyledButton>
          </div>,
        ]}
      >
        {purchaseList}
      </Drawer>
      <Modal
        title={<h2>Finalize sua compra</h2>}
        open={isModalOpen}
        onClose={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose} danger>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: "#93B48B" }}
            loading={isLoading}
          >
            Finalizar
          </Button>,
        ]}
        width={"600px"}
      >
        <p>{getUser.name}, você está prestes a finalizar sua compra!</p>
        {purchaseList}
        <h3>Total do pedido: R${calculateTotal(purchaseList)},00</h3>
        <h2>Selecione o endereço de entrega:</h2>
        <Radio
          value={getUser?.address?.id}
          onClick={(e) => setSelectedAddress(e.target.value)}
        >
          {getUser?.address?.street} {getUser?.address?.number}
        </Radio>
        <h2>Informe o método de pagamento:</h2>
        <Form>
          <select
            placeholder={"Tipo de Pagamento"}
            name={"type"}
            value={form.type}
            onChange={onChange}
            required
          >
            <option value={""} disabled>
              Escolha o tipo
            </option>
            <option data-testid="bill" value={"bill"}>Boleto</option>
            <option data-testid="card" value={"card"}>Cartão</option>
          </select>

          {form.type === "card" && (
            <select
              placeholder={"Número de parcelas"}
              name={"installments"}
              value={form.installments}
              onChange={onChange}
              required
              data-testid="installments"
            >
              <option value={""} disabled>
                Escolha a quantidade de parcelas
              </option>
              <option value={1}>1x de {calculateInstallments(1)}</option>
              <option value={2}>2x de {calculateInstallments(2)}</option>
              <option value={4}>4x de {calculateInstallments(4)}</option>
            </select>
          )}

          {form.type === "bill" && (
            <DateWrapper>
              <p>Data de pagamento</p>
              <input type="date" onChange={onChange} name="paymentDate" />
              <p>Data de vencimento</p>
              <input type="date" onChange={onChange} name="dueDate" />
            </DateWrapper>
          )}
        </Form>
      </Modal>
    </Main>
  );
};

export default ListBikesPage;
