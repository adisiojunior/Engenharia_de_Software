import React from 'react';

const Services = async ({ services, loading }) => {
  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <ul>
      {services.map((service) => (
        <li key={service.id}>
          <h1>{service.name}</h1>
          <img src={service.image} alt={service.name} />
          <div>
            <p>Nota:</p>
            <p>{service.ratingMean}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Services;
