import React, { useState } from "react";
import Header from "../Components/Header";
import styled from "styled-components";
import UseGetData from "../Hooks/UseGetDate";
import { getId } from "../utils/localStorage";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { statesMap } from "../utils/statesMap";
import { Modal, Button } from "antd";
import CartCard from "../Components/CartCard";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin-top: 10%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  z-index: 10;
`;

const OrderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  border: 4px dashed #8491a3;
  p {
    margin-bottom: 5px;
    margin-top: 5px;
    font-weight: 500;
  }
  &:hover {
    cursor: pointer;
    border: 4px dashed #93b48b;
  }
`;

const ListOrdersPage = () => {
  //pegar dados do pedido
  const [getOrders] = UseGetData(`/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0`, []);

  //estados para controle da modal
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  //navegação
  const navigate = useNavigate();

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  //lista os pedidos
  const ordersList = getOrders?.map((order) => {
    return (
      <OrderCard key={order.id}>
        <p>Pedido feito em {formatDate(order.created_at)}</p>
        <p>Estado do pedido: {statesMap(order.payment.state)}</p>
        <p>Valor total: R${order.payment.totalAmount},00</p>
        <button onClick={() => handleOpenModal(order)}>ver detalhes</button>
      </OrderCard>
    );
  });

  //lista os itens do pedido
  const orderItems = selectedOrder?.products?.map((prod) => {
    return <CartCard key={prod.id} bike={prod} />;
  });

  return (
    <Main>
      <Header />
      <button
        onClick={() => navigate("/ListBikes")}
        style={{
          position: "absolute",
          top: "90px",
          left: "40px",
          height: "30px",
          width: "200px",
        }}
      >
        ⬅️ Continuar comprando
      </button>

      {ordersList.length > 0 ? (
        <Content>
          {ordersList}
        </Content>
      ) : (
        <Content>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />{" "}
        </Content>
      )}
      <Modal
        title={<h2>Detalhes do pedido</h2>}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        open={open}
        footer={[
          <Button
            key="back"
            data-testid="close"
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "#b55757", color: "white" }}
          >
            Fechar
          </Button>,
        ]}
      >
        <h3>Data da compra: {formatDate(selectedOrder?.created_at)}</h3>
        <p>Valor total: R${selectedOrder?.payment?.totalAmount},00</p>
        <p>
          Método de pagamento:{" "}
          {selectedOrder?.payment?.type === "card" ? "Cartão" : "Boleto"}
        </p>
        <p>Status: {statesMap(selectedOrder?.payment?.state)}</p>
        <h2>Itens do pedido</h2>
        {orderItems}
      </Modal>
    </Main>
  );
};

export default ListOrdersPage;
