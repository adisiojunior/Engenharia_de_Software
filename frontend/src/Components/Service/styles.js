import styled from 'styled-components';

export const Div = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  flex-direction: column-reverse;
  padding-top: 15px;
  padding-left: 10px;
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  background-size: 100%;
  background-image: ${(props) => `url(${props.img})`};

  ::before {
    content: '';
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 52px 42px rgb(0 0 0 / 43%);
    display: block;
    height: 15%;
    width: 100%;
    position: relative;
    transition: all 0.5s;
    z-index: 1;
  }
`;

export const TitlenRating = styled.div`
  position: absolute;
  z-index: 2;
`;

export const Title = styled.h4`
  width: 95%;
  margin-top: 5px;
  color: white;
`;

export const Rating = styled.div`
  margin-bottom: 5px;
  color: white;
`;
