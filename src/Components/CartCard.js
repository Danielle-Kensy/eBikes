import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  height: 10%;
  border-radius: 10px;
  border: 2px dashed #8491a3;
  font-size: 80%;
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  align-items: center;
  img {
    width: 15%;
    height: 100%;
    margin: 0;
  }
  p {
    color: black;
    margin: 5px;
    font-weight: 600;
  }
`;

const CartCard = (props) => {
  const { price, model, img, quantity } = props.bike;

  return (
    <Card>
      <img src={img} alt="Imagem da bike" />
      <p>
        {" "}
        {quantity ?? '1'} x {model} - R$ {price},00
      </p>
      {props.showRemoveButton && (
        <button
          data-testid="remove"
          style={{
            backgroundColor: "#c75661",
            height: "30px",
            marginBottom: 0,
            width: "30px",
          }}
          onClick={() => props.removeItemFromCart(props.bike.id)}
        >
          X
        </button>
      )}
    </Card>
  );
};

export default CartCard;
