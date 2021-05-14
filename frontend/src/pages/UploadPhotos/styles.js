import styled from 'styled-components';
import { Button } from 'reactstrap';
import Background from '../../assets/bg-image-registerBusiness.jpg';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${Background});
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
