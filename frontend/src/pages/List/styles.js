import styled from 'styled-components';
import { Button } from 'reactstrap';
// Azul #34669a , Azul Bebe #61c4e3 , Azul Escuro #14142c

export const Title = styled.div`
  font-size: 1rem;
  position: relative;
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #dbe9f4;
`;

export const Container = styled.div`
  width: 1200px;
  margin: 100px auto;
  height: 90%;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.2rem;

  section {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Filtros = styled.div`
  width: 400px;
  margin-left: 1.2rem;
  height: 90%;
  background-color: white;
  background-size: 100%;

  justify-content: space-between;
  align-items: center;
`;

export const Category = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;

  border: outline;
  border-radius: 3rem;
  width: 80%;
  height: 2.5rem;
  background: #34669a;
  color: #fff;
  transition: 0.2s;

  p {
    display: inline-block;
    margin-top: 0.875rem;
  }

  :hover {
    background: #34669a;
  }
`;

export const StyledImg = styled.img`
  width: 20px;
  /* padding-bottom: 6px; */
  margin-right: 12px;
`;
