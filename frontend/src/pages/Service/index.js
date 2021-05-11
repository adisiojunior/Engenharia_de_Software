// import { BsStarFill } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import LogoBairro from '../../assets/LOGO BAIRRO.png';
import api from '../../services/api';
import { getToken } from '../../services/auth';
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
  EditButton,
} from './styles';

const Service = () => {
  // TODO: Sync all data and end comments
  const [userMain, setUserMain] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setService(res.data.service);
        setUserMain(res.data.service.editable);
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
          {service.category
            ? service.category.map((name) => (
                <Category key={name}>{name}</Category>
              ))
            : null}
          <span>{service.slogan}</span>
        </CategoryList>

        {userMain ? (
          <EditButton
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              history.push(`/service/${service._id}`);
            }}
          >
            <img src={LogoBairro} alt='Editar' />
          </EditButton>
        ) : null}
        <Info>
          <Photo>
            <img
              src={
                service.image ||
                'http://www.ifs.edu.br/images/M_images/default.png'
              }
              alt='default'
            />
          </Photo>
          <Contacts>
            <h5>Contato:</h5>
            {contacts.length > 0 &&
              contacts.map((name) => <div key={name}>{name}</div>)}
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
