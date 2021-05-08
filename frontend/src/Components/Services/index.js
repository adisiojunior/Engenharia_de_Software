import React from 'react';

const Services = ({ services, loading }) => {
  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <ul>
      {services.map((service) => (
        <li key={service.id}>
          <div>
            <h1>{service.name}</h1>
            <img src={service.image} alt={service.name} />
          </div>
          <div>
            <div>
              <img src='' alt='' />
              <p>{service.whatsapp}</p>
            </div>
            <div>
              <img src='' alt='' />
              <p>{service.street}</p>
            </div>
          </div>
          <div>
            <img src='' alt='' />
            <p>{service.ratingMean}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Services;
