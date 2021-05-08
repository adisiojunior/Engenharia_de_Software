// import { BsStarFill } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import api from '../../services/api';
import {
  Background,
  Container,
  Title,
  Address,
  Contacts,
  Details,
  // Highlights,
  Info,
  // Name,
  Photo,
  // Rating,
  Recommended,
  Category,
  CategoryList,
  TitleRecommended,
} from './styles';

const Service = () => {
  // TODO: Sync all data and end comments

  const { id } = useParams();
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res);
      } catch (error) {
        <Redirect to={{ pathname: '*' }} />;
      }
    };

    fetchService();
  }, []);

  const category = [];
  const contacts = [];
  const chosenCategory = () => {
    return category[Math.floor(Math.random() * category.length)];
  };

  return (
    <Background>
      <Container>
        <Title>{service.name}</Title>
        <CategoryList>
          {category.length > 0 &&
            category.map((name) => <Category>{name}</Category>)}
          <span>{service.slogan}</span>
        </CategoryList>
        <Info>
          <Photo>
            <img
              src={
                service.img ||
                'http://www.ifs.edu.br/images/M_images/default.png'
              }
              alt='default'
            />
          </Photo>
          <Contacts>
            <h5>Contato:</h5>
            {contacts.length > 0 && contacts.map((name) => <div>{name}</div>)}
          </Contacts>
          <Details>{service.description}</Details>
          <Address>
            <h5>Localização:</h5>
            {service.street},{service.neighborhood}
          </Address>
        </Info>
        <Recommended>
          <TitleRecommended>
            Outros resultados para {chosenCategory}
          </TitleRecommended>
          <hr />
          {/* recommended.length > 0 &&
            recommended.map((name) => (
              <Highlights>
                <Name>{name.name}</Name>
                <Rating>
                  {name.vote_average}
                  <BsStarFill
                    color='F5CE6A'
                    size='1.5em'
                    style={{ alignSelf: 'center', marginLeft: '10px' }}
                  />
                </Rating>
              </Highlights>
            )) */}
        </Recommended>
      </Container>
    </Background>
  );
};

export default Service;
