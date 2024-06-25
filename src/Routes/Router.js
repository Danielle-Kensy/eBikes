import React from "react";
import ListBikesPage from "../Pages/ListBikesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import error from "../img/error.png";
import styled from "styled-components";
import ListOrdersPage from "../Pages/ListOrdersPage";

const Frame = styled.img`
  border-radius: 10px;
  width: 40vw;
  height: 80vh;
`;

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/ListBikes" element={<ListBikesPage />} />
        <Route exact path="/ListOrders" element={<ListOrdersPage />} />
        <Route
          path="*"
          element={<Frame src={error} alt="FOTO DE ERRO" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
