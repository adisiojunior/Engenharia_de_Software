import { Button } from 'reactstrap';
import styled from 'styled-components';

export const Container = styled.div`
  width: auto;
  height: 100%;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Register = styled.div`
  height: 100%;
  width: 40%;
  background-color: white;
  opacity: 70%;
  padding: 30px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

export const StyledButton = styled(Button)`
  outline
  width: 100%;
  margin: 1rem;
  color: #34669A;
  border-radius: 1rem;
  border-color: #34669A;

  :hover {
    background-color: #34669A;
    border-color: #34669A;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// body {
//   box-sizing: border-box;
//   height: 100%;
//   width: 100%;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: Raleway;
// }

// .main {
//   background: #eeeeee;
//   border-radius: 1rem;
//   height: 80vh;
//   width: 60vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }

// .title {
//   font-size: 2rem;
//   font-weight: 900;
// }
