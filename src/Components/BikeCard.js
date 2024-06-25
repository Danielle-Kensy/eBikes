import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, Tag } from "antd";
import {Toaster, toast} from 'react-hot-toast';

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

const BikeCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { color, marches, brand, model, price, categorys, img } = props.bike;

  const buyBike = () => {
    props.addItemToCart(props.bike);
    toast.success('Produto adicionado ao carrinho!')
  };

  const categorysList = categorys.map((category) => (
    <Tag key={category} color="green">
      {category}
    </Tag>
  ));

  return (
    <>
      <Card onClick={() => setIsModalOpen(true)}>
        <img src={img} alt="Imagem da viagem" />
        <p>
          <b>Marca - </b> {brand}
        </p>
        <p>Modelo - {model}</p>
        <p>
          <b>R$ </b> {price},00
        </p>
        <button>Comprar</button>
      </Card>
      <Modal
        title={
          <h2>
            Detalhes {brand} {model}
          </h2>
        }
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)} danger>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={buyBike}
            style={{ backgroundColor: "#93B48B" }}
          >
            Comprar
          </Button>,
        ]}
        width={"600px"}
      >
        <ContentWrapper>
          <ImageFrame src={img} alt="Imagem da viagem" />
        </ContentWrapper>
        <DetailsWrapper>
          <h2>
            <b>R$ </b> {price},00
          </h2>
        </DetailsWrapper>
        <ul>
          <li>
            <b>Marca - </b> {brand}
          </li>
          <li>Marchas - {marches}</li>
          <li>Modelo - {model}</li>
        </ul>
        <StyledTag>{categorysList}</StyledTag>
        <Toaster position="top-center" reverseOrder={false} />
      </Modal>
    </>
  );
};

export default BikeCard;
