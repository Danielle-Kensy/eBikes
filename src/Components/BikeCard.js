import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Button, Tag, notification } from "antd";
import biker from "../img/biker.png";

const Card = styled.div`
  width: 220px;
  height: 210px;
  border-radius: 24px;
  border: 5px solid #8491a3;
  font-size: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
    height: 50%;
    margin: 0;
  }
  p {
    color: black;
    margin: 5px;
    font-weight: 600;
  }
  &:hover {
    cursor: pointer;
    border: 5px solid #93b48b;
  }
  button {
    height: 30px;
  }
  button:hover {
    cursor: pointer;
    background-color: #51624d;
  }
  @media (max-width: 768px) {
    width: 340px;
    height: 210px;

    button {
      width: 90%;
      border-radius: 10px;
    }
  }
`;

const ImageFrame = styled.img`
  width: 40%;
  height: 30%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;

const StyledTag = styled.p`
  margin-left: 28px;
`;

const StyledSelect = styled.select`
  width: 80%;
  height: 35px;
  border-radius: 10px;
  padding: 4px 8px;
  margin-left: 23px;
  border-width: 1px;
`;

const BikeCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notify, contextHolder] = notification.useNotification();

  const { id, charge, marches, brand, model, price, categorys, img } =
    props.bike;

  const buyBike = () => {
    props.addItemToCart(props.bike);
    notify.success({
      message: "Bike alugada com sucesso!",
    });
    setIsModalOpen(false);
  };

  const categorysList = categorys.map((category) => (
    <Tag key={category} color="green">
      {category}
    </Tag>
  ));

  return (
    <>
      {contextHolder}
      <Card key={id} data-testid="card" onClick={() => setIsModalOpen(true)}>
        <img src={biker} alt="Imagem da viagem" />
        <p>
          <b>Carga disponível - </b> {charge}km
        </p>
        {/* <p>Modelo - {model}</p>
        <p>
          <b>R$ </b> {price},00
        </p> */}
        <button>Selecionar</button>
      </Card>
      <Modal
        title={<h2>Finalize o aluguel:</h2>}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key="back"
            data-testid="close"
            onClick={() => setIsModalOpen(false)}
            danger
          >
            Cancelar
          </Button>,
          <Button
            key="submit"
            data-testid="buy"
            type="primary"
            onClick={buyBike}
            style={{ backgroundColor: "#93B48B", width: "150px" }}
          >
            Alugar
          </Button>,
        ]}
        width={"600px"}
      >
        <ContentWrapper>
          <ImageFrame src={biker} alt="Imagem da bike" />
        </ContentWrapper>
        {/* <DetailsWrapper>
          <h2>
            <b>R$ </b> {price},00
          </h2>
        </DetailsWrapper> */}
        <StyledTag>{categorysList}</StyledTag>
        <ul>
          <li>
            <b>Carga disponível - {charge}km</b>
          </li>
          {/* <li>Marchas - {marches}</li>
          <li>Modelo - {model}</li> */}
          <li>Por quanto tempo deseja alugar?</li>
        </ul>
        <StyledSelect
          placeholder={"Número de parcelas"}
          name={"installments"}
          onChange={() => console.log("valor selecionado")}
        >
          <option value={""} disabled>
            Escolha a quantidade de parcelas
          </option>
          <option value={1}>30min por R$15,00</option>
          <option value={2}>60min por R$25,00</option>
          <option value={4}>120min de R$30,00</option>
        </StyledSelect>
      </Modal>
    </>
  );
};

export default BikeCard;
