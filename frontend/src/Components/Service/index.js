import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Div, Title, Rating, TitlenRating } from './styles';

const Service = ({ service }) => {
  return (
    // eslint-disable-next-line no-underscore-dangle
    <Link to={`/services/${service._id}`}>
      <Div img={service.image}>
        <TitlenRating>
          <Title>{service.name}</Title>
          <Rating>
            <FaStar />
            {service.ratingMean}
          </Rating>
        </TitlenRating>
      </Div>
    </Link>
  );
};

export default Service;
