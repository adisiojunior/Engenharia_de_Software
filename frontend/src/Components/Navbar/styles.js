import styled from 'styled-components';

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

export const Login = styled.button`
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: 100px;
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
  width: 100px;
  height: 40px;
  align-self: end;
  color: white;
  background: #f87c7c;
  border: none;
  border-radius: 5px;
`;
export const CreateButton = styled.button`
  width: 130px;
  height: 40px;
  align-self: end;
  color: white;
  background: #34669a;
  border: none;
  border-radius: 5px;
`;
