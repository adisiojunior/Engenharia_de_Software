import { BsStarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  StarsInput,
  DescriptionInput,
  InputRatesDiv,
  InputsAndButtonDiv,
  RateButton,
  InputnLabel,
  LabelInput,
  Slogan,
} from './styles';

const Service = () => {
  const [userMain, setUserMain] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [rating, setRating] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState([]);
  const [stars, setStars] = useState([]);

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
        setImages(res.data.service.image);
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
      setRating(res.data.ratings);
    };

    fetchService();
  }, []);

  useEffect(() => {}, []);

  const handleRate = () => {
    api.post(`/services/${id}/ratings`, { stars, description });
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
          <Slogan>{service.slogan}</Slogan>
        </CategoryList>

        {userMain ? (
          <EditButton
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              history.push(`/service/update/${service._id}`);
            }}
          >
            <p>Editar</p>
          </EditButton>
        ) : null}
        <Info>
          <Photo>
            {service.image ? (
              <CarouselComponent
                items={images}
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
            {rating.map((item) => (
              // eslint-disable-next-line no-underscore-dangle
              <UserRating key={item._id}>
                <UserInfo>
                  <span>{item.user}</span>
                </UserInfo>
                <span>Descrição</span>
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
            ))}
          </RatingPlace>
          <hr />
          <InputsAndButtonDiv>
            <InputRatesDiv>
              <InputnLabel width='90%'>
                <LabelInput for='inputDescription'>Comentário</LabelInput>
                <DescriptionInput
                  type='text'
                  id='inputDescription'
                  onChange={(descriptionValue) => {
                    setDescription(descriptionValue.target.value);
                  }}
                />
              </InputnLabel>
              <InputnLabel width='1 0%'>
                <LabelInput for='inputStars'>Nota</LabelInput>
                <StarsInput
                  type='number'
                  id='inputStars'
                  onChange={(starsValue) => {
                    setStars(starsValue.target.value);
                  }}
                />
              </InputnLabel>
            </InputRatesDiv>
            <RateButton type='submit' onClick={handleRate}>
              Avaliar
            </RateButton>
          </InputsAndButtonDiv>
        </Rating>
      </Container>
      <Footer />
    </Background>
  );
};

export default Service;
