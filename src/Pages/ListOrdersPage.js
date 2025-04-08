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
import ch from "../img/ch.png";
import gasometro from "../img/gasometro.jpg";
import meninodeus from "../img/meninodeus.jpeg";
import orlaguaiba from "../img/orlaguaiba.jpg";

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
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 35%;
  }
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
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    border: 4px dashed #93b48b;
  }
  @media (max-width: 768px) {
    width: 380px;
    -webkit-box-shadow: 0px 0px 18px -4px rgba(161, 158, 161, 0.6);
    -moz-box-shadow: 0px 0px 18px -4px rgba(161, 158, 161, 0.6);
    box-shadow: 0px 0px 18px -4px rgba(161, 158, 161, 0.6);
    border: none;
    &:hover {
      cursor: pointer;
      border: 1px solid #4848485d;
      width: 390px;
      height: 195px;
    }
    img {
      width: 100%;
      height: 73%;
      border-radius: 10px 10px 0 0;
    }
  }
`;

const ListOrdersPage = () => {
  //pegar dados do pedido
  const [getOrders] = UseGetData(
    `/order/428e75c3-418e-4d5d-867a-7db7e44c5ce0`,
    []
  );

  //"Estação Centro Histórico", estação menino deus, estação gasometro, estação da orla
  const getStations = [
    {
      id: "1",
      address: "Centro Histórico",
      distance: 15,
      img: ch,
    },
    {
      id: "2",
      address: "Bairro Menino Deus",
      distance: 3,
      img: meninodeus,
    },
    {
      id: "3",
      address: "Gasômetro",
      distance: 10,
      img: gasometro,
    },
    {
      id: "4",
      address: "Orla do Guaíba",
      distance: 17,
      img: orlaguaiba,
    },
  ];

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
  const ordersList = getStations?.map((order) => {
    return (
      <OrderCard key={order.id}>
        <img src={order.img} alt="imagem da estação" />
        <p>
          📍{order.address}, distância {order.distance}km
        </p>
        {/* <p>Pedido feito em {formatDate(order.created_at)}</p>
        <p>Estado do pedido: {statesMap(order.payment.state)}</p>
        <p>Valor total: R${order.payment.totalAmount},00</p>
        <button onClick={() => handleOpenModal(order)}>ver detalhes</button> */}
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
          top: "100px",
          left: "18px",
          height: "30px",
          width: "170px",
          borderRadius: "10px",
        }}
      >
        ⬅️ Bikes próximas
      </button>

      {ordersList.length > 0 ? (
        <Content>{ordersList}</Content>
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
