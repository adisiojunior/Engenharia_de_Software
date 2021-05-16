import styled from 'styled-components';
// Azul #34669a , Azul Bebe #61c4e3 , Azul Escuro #14142c

export const Container = styled.div`
  align-items: center;
  width: 100%;
  padding-top: 100px;
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-column-gap: 40px;
`;

export const BoxSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;
