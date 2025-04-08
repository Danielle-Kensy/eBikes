import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import bike from "../img/bike.png";

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 12;
  background-color: white;
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
  button {
    border-radius: 7px;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const goToOrders = () => {
    navigate("/ListOrders");
  };

  return (
    <HeaderWrapper>
      <img src={bike} width={'60px'}/>
      <Buttons>
        <button
          style={{ height: "20px", marginBottom: "5px" }}
          onClick={goToOrders}
        >
          Estações
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
