import React from 'react';

const Service = ({ service }) => {
  return (
    <ul>
      <li key={service.id}>{service.name}</li>
    </ul>
  );
};

export default Service;
