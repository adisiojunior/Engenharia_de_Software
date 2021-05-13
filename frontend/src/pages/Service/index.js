import { BsStarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LogoBairro from '../../assets/LOGO BAIRRO.png';
import api from '../../services/api';
import { getToken } from '../../services/auth';
import Footer from '../../Components/Footer';
import CarouselComponent from '../../Components/Carousel';
import {
  Background,
  Container,
  Title,
  Address,
  Contacts,
  Details,
  Highlights,
  Info,
  Photo,
  Recommended,
  Category,
  CategoryList,
  RecommendedRating,
  UserInfo,
  RecommendedName,
  RecommendedTitle,
  Rating,
  RatingTitle,
  UserRating,
  UserComment,
  UserStars,
  RatingPlace,
  EditButton,
} from './styles';

const Service = () => {
  const [userMain, setUserMain] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [rating, setRating] = useState([]);

  const chosenCategory = () => {
    return service.category[
      Math.floor(Math.random() * service.category.length)
    ];
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setService(res.data.service);
        setUserMain(res.data.service.editable);
      } catch (error) {
        history.push();
      }
    };

    fetchService();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      const res = await api.get(`/services?limit=8&category=${chosenCategory}`);
      setRecommended(res.data);
    };

    fetchService();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      const res = await api.get(`/services/${id}/ratings`);
      setRating(res.data);
    };

    fetchService();
  }, []);

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
          {service.imgList ? (
              <CarouselComponent
                items={service.imgList}
                imgHeight='50vh'
                imgWidth='48.8vw'
              />
            ) : null}
          </Photo>
          <Contacts>
            <h5>Contato:</h5>
            {service.instagram ? (
              <div>
                <FaInstagram style={{ marginRight: '10px' }} />
                {service.instagram}
              </div>
            ) : null}
            {service.whatsapp ? (
              <div>
                <FaWhatsapp style={{ marginRight: '10px' }} />
                {service.whatsapp}
              </div>
            ) : null}
            {service.email ? (
              <div>
                <HiOutlineMail style={{ marginRight: '10px' }} />
                {service.email}
              </div>
            ) : null}
          </Contacts>
          <Details>{service.description}</Details>
          <Address>
            <h5>Localização:</h5>
            <MdLocationOn /> {service.street},{service.neighborhood}
          </Address>
        </Info>
        <Recommended>
          <RecommendedTitle>
            Outros resultados para {chosenCategory}
          </RecommendedTitle>
          <hr />
          {recommended
            ? recommended.map((item) => (
                <Highlights key={item}>
                  <RecommendedName>{item.name}</RecommendedName>
                  <RecommendedRating>
                    {item.vote_average}
                    <BsStarFill
                      color='F5CE6A'
                      size='1.5em'
                      style={{ alignSelf: 'center', marginLeft: '10px' }}
                    />
                  </RecommendedRating>
                </Highlights>
              ))
            : null}
        </Recommended>
        <Rating>
          <RatingTitle>Avaliações dos Clientes</RatingTitle>
          <hr />
          <RatingPlace>
            {rating
              ? rating.map((item) => (
                  <UserRating key={item}>
                    <UserInfo>
                      <img
                        src='https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
                        alt='Default'
                      />
                      <span>Usuário</span>
                    </UserInfo>
                    <UserComment>{item.description}</UserComment>
                    <UserStars>
                      {item.stars}
                      <BsStarFill
                        color='F5CE6A'
                        size='1.5rem'
                        style={{ marginLeft: '0.5rem' }}
                      />
                    </UserStars>
                  </UserRating>
                ))
              : null}
          </RatingPlace>
        </Rating>
      </Container>
      <Footer />
    </Background>
  );
};

export default Service;
