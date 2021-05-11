import { Button, Input } from 'reactstrap';
import styled from 'styled-components';
import Background from '../../assets/bg-image-login.jpg';

export const Container = styled.div`
  width: auto;
  height: 100%;
  background-image: url(${Background});
  background-size: 100%;
`;

export const Login = styled.div`
  height: 100%;
  width: 40%;
  background-color: rgba(255, 255, 255, 0.7);
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
  border: outline;
  width: 100%;
  color: #34669a;
  border-color: #34669a;

  :hover {
    background-color: #34669a;
    border-color: #34669a;
  }
`;

export const StyledInput = styled(Input)`
  background: none;
  border-color: #34669a;
`;
