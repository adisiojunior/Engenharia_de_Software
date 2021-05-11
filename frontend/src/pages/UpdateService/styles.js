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
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  margin-top: 54px;
`;

export const ButtonStyle = styled(Button)`
  margin: 1rem;
  color: #34669a;
  border-radius: 1rem;
  border-color: #34669a;
  :hover {
    background-color: #34669a;
    border-color: #34669a;
  }
`;
export const ButtonDeleteStyle = styled(Button)`
  margin: 1rem;
  color: red;
  border-radius: 1rem;
  border-color: red;
  :hover {
    background-color: red;
    border-color: red;
  }
`;

export const FormButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
