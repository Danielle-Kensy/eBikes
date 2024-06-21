import React, { useState } from "react";
import styled from "styled-components";
import UseGetData from "../Hooks/UseGetDate";
import { useHistory } from "react-router-dom";
import { UseProtectedPage } from "../Hooks/UsePotectedPage";
import Header from "../Components/Header";
import BikeCard from "../Components/BikeCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FloatButton, Drawer, Modal, Button, Radio } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartCard from "../Components/CartCard";
import UseForm from "../Hooks/UseForm";
import UseGetProtectedData from "../Hooks/UseGetProtected";
import axios from "axios"

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

const ListBikesPage = () => {
  UseProtectedPage();

  //Estado para navegação entre as páginas
  const history = useHistory();

  //dados retornados da API
  const [getBikes] = UseGetData("/bike", {});
  const [getUser] = UseGetProtectedData("user/profile", {})

  //estados para controle do carrinho
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  //estados formulário
  const { form, onChange } = UseForm({
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
    console.log(newPurchaseList);
  };

  // Método que adiciona item no carrinho
  const addItemToCart = (bike) => {
    const newPurchaseList = [
      ...purchaseList,
      <CartCard
        key={bike?.id}
        bike={bike}
        removeItemFromCart={removeItemFromCart}
        showRemoveButton={true}
      />,
    ];
    setPurchaseList(newPurchaseList);
  };

  //lista de todos as bikes disponíveis
  const bikesList =
    getBikes?.length > 0 &&
    getBikes.map((bike, i) => {
      return <BikeCard key={i} bike={bike} addItemToCart={addItemToCart} />;
    });

  //método para administrar o carrinho
  const onClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsLoading(true)
    //criando objeto do pedido esperado pela requisição
    const order = {
      user_id: getUser?.id ?? null,
      address_id: selectedAddress ?? null,
      payment: {
        type: form?.type ?? null,
        installments: form?.installments !== "" ? form?.installments : null,
        totalAmount: 800,
        paymentDate: form?.paymentDate !== "" ? form?.paymentDate : null,
        dueDate: form?.dueDate !== "" ? form?.dueDate : null,
      },
      products: purchaseList?.map((item) => ({
        id: item.props.bike?.id ?? null,
        quantity: 1,
        price: item.props.bike?.price ?? null
      }))
    }
    console.log(order)
    const URL = `http://localhost:3003/order/make`

    //requisição para criar pedido
    axios
    .post(URL, order)
        
    .then(() => {
        setIsLoading(false)
        alert("Pedido realizado com sucesso")
        history.push("/ListOrders")

    })
    .catch((err) => {
        console.log(err)
        setIsLoading(false)
        alert("Erro ao fazer pedido")
    });
  };

  const openModalCloseDrawer = () => {
    setOpen(false);
    setIsModalOpen(true);
  };

  const calculateTotal = () => {
    let total = 0;
    purchaseList.forEach((item) => {
      total += item.props.bike?.price ?? 0;
    });
    return total;
  };

  const calculateInstallments = (installments) => {
    return `R$ ${calculateTotal() / installments},00`
  };

  console.log(purchaseList)

  return (
    <Main>
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
      />
      <Drawer
        title="Carrinho 🛒"
        onClose={onClose}
        open={open}
        footer={[
          <>
            <p>Total: R${calculateTotal()},00</p>
            <button
              key="back"
              onClick={() => openModalCloseDrawer()}
              style={{ width: "100%" }}
            >
              Finalizar Compra
            </button>
          </>,
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
        <h3>Total: R${calculateTotal()},00</h3>
        <h2>Selecione o endereço de entrega:</h2>
        <Radio value={getUser?.address?.id} onClick={(e) => setSelectedAddress(e.target.value)}>
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
            <option value={"bill"}>Boleto</option>
            <option value={"card"}>Cartão</option>
          </select>

          {form.type === "card" && (
            <select
              placeholder={"Número de parcelas"}
              name={"installments"}
              value={form.installments}
              onChange={onChange}
              required
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
              <input
                type="date"
                onChange={onChange}
                name="dueDate"
              />
            </DateWrapper>
          )}
        </Form>
      </Modal>
    </Main>
  );
};

export default ListBikesPage;
