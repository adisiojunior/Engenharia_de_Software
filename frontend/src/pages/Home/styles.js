import { Button, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import Background from '../../assets/bg-image-home.jpg';

export const Container = styled.div`
  width: auto;
  height: 100%;
  background-image: url(${Background});
  background-size: 100%;
  display: flex;
  justify-content: space-between;
`;

export const SearchDiv = styled.div`
  background-color: white;
  opacity: 70%;
  height: 100%;
  width: 40%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h4`
  text-align: left;
  margin-bottom: 50px;
`;

export const Image = styled.img`
  width: 500px;
  height: auto;
  justify-self: center;
`;

export const Description = styled.p`
  text-align: left;
  margin: 0 80px;
  padding: 10px;
  font-size: 13px;
  color: white;
`;

export const LineBar = styled.hr`
  height: 100%;
  width: 1px;
`;

export const SearchResult = styled.div`
  display: grid;
  height: 100%;
  width: 60%;
  padding: 70px 30px 30px;
`;

export const StyledButtonFilter = styled(Button)`
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
  background: ${(props) => (props.isSelected ? '#34669a' : 'lightgrey')};
  color: ${(props) => (props.isSelected ? 'white' : '#34669a')};
  border-color: ${(props) => (props.isSelected ? '#34669a' : 'lightgrey')};
  border-radius: 20px;
  border: none;

  :hover {
    background: ${(props) => (props.isSelected ? '#34669a' : 'lightgrey')};
    color: ${(props) => (props.isSelected ? 'white' : '#34669a')};
    border-color: ${(props) => (props.isSelected ? '#34669a' : 'lightgrey')};
  }

  :focus {
    outline: 0 !important;
    background: ${(props) => (props.isSelected ? '#34669a' : 'lightgrey')};
    color: ${(props) => (props.isSelected ? 'white' : '#34669a')};
    border-color: ${(props) => (props.isSelected ? '#34669a' : 'lightgrey')};
  }

  svg {
    margin-right: 8px;
    width: 20px;
    height: auto;
  }
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

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

export const InputSearch = styled(Input)`
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-width: 2px;
  border-color: #14142c;
  border-radius: 0;
  height: 50px;
`;

export const Subtitle = styled(Label)`
  font-size: 20px;
`;
