import React from "react";
import ListBikesPage from "../Pages/ListBikesPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
      <Switch>
        <Route exact path={"/"}>
          <LoginPage></LoginPage>
        </Route>

        <Route exact path={"/ListBikes"}>
          <ListBikesPage></ListBikesPage>
        </Route>

        <Route exact path={"/ListOrders"}>
          <ListOrdersPage></ListOrdersPage>
        </Route>

        <Route>
          <Frame src={error} alt="FOTO DE ERRO" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
