import React from 'react';
import { Div, Title, Rating } from './styles';

const Service = ({ service }) => {
  return (
    <Div img={service.image}>
      <Title>
        {service.name}
      </Title>
      <Rating>
        {service.rating}
      </Rating>
    </Div>
  );
};

export default Service;
