import React from 'react';

const Services = ({ services, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul>
      {services.map((service) => (
        <li key={service.id}>{service.name}</li>
      ))}
    </ul>
  );
};

export default Services;
