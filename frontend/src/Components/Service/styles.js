import styled from 'styled-components';

export const Div = styled.div`
  width: 150px;
  height: 100px;
  border-radius: 5px;
  background-image: ${(props) => url(props.img)};
  
  :after {
    background-color: linear-gradient(to bottom, back 0%, transparent 40%);
  }
`;

export const Title = styled.h4`
  margin-bottom: 10px;
`;

export const Rating = styled.div`
  margin-bottom: 10px;
`;