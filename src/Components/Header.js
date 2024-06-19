import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeaderWrapper = styled.div`
  position: fixed;
  margin-top: 0;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
  -webkit-box-shadow: 0px 6px 6px 0px rgba(219, 215, 219, 1);
  -moz-box-shadow: 0px 6px 6px 0px rgba(219, 215, 219, 1);
  box-shadow: 0px 6px 6px 0px rgba(219, 215, 219, 1);
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
`;

const Header = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const goToOrders = () => {
    history.push("/ListOrders");
  };

  return (
    <HeaderWrapper>
      <h1>eBikes</h1>
      <Buttons>
        <button
          style={{ height: "20px", marginBottom: "5px" }}
          onClick={goToOrders}
        >
          Meus pedidos
        </button>
        <button
          onClick={logout}
          style={{ height: "20px", marginBottom: "5px" }}
        >
          Logout
        </button>
      </Buttons>
    </HeaderWrapper>
  );
};

export default Header;
