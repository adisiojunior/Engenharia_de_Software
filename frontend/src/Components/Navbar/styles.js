import styled from 'styled-components';
import { ModalFooter, ModalBody } from 'reactstrap';

export const StyledImg = styled.img`
  width: 30px;
  padding-bottom: 6px;
  margin-right: 12px;
`;

export const Button = styled.button`
  border: none;
  background: white;
`;

export const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: end;
`;

export const DivServices = styled(ModalBody)`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-column-gap: 3px;
  justify-content: space-between;
  align-items: center;
  margin-left: 24px;

  p {
    margin-top: 18px;
    margin-left: 85px;
    position: absolute;
  }
`;

export const Login = styled.button`
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  min-width: 140px;
  width: auto;
  height: 40px;
  color: black;
  border: none;
  border-radius: 1rem;
  background-color: white;

  :hover {
    background-color: #ddd;
  }

  p {
    margin-top: 6px;
    position: relative;
  }

  a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
  }
`;

export const DivLogout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LogoutButton = styled.button`
  width: 150px;
  height: 40px;
  padding: 5px;
  align-self: end;
  color: white;
  background: #f87c7c;
  border: none;
  border-radius: 5px;
`;

export const ModalTitle = styled.h4`
  margin-top: 5px;
  align-self: center;
`;

export const ServiceButton = styled.button`
  margin-top: 8px;
  width: 130px;
  height: 40px;
  color: white;
  background: #61c4e3;
  border: none;
  border-radius: 5px;

  a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
  }
`;
export const CreateButton = styled.button`
  width: 130px;
  height: 40px;
  color: white;
  background: #61c4e3;
  border: none;
  border-radius: 5px;

  a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
  }
`;

export const NewModalFooter = styled(ModalFooter)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
