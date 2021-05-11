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
  background: #34669a;
`;

export const Container = styled.div`
  width: 1200px;
  margin: 100px auto;
  height: 90%;
  background-color: #ddd;
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
  align-items: center;
  justify-content: center;

  border: outline;
  border-radius: 3rem;
  width: 50%;
  height: 2.5rem;
  color: #34669a;
  border-color: #34669a;
  transition: 0.2s;

  :hover {
    filter: 0.8;
  }
`;
