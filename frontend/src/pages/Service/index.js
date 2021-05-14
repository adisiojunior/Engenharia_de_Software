import { BsStarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  LabelUserTitle,
  DivUserRating,
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
  const [update, setUpdate] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  // const chosenCategory = () => {
  //   return allCategories[Math.floor(Math.random() * allCategories.length)];
  // };

  const recommendSideBox = async () => {
    // const arrayCategory = [chosenCategory()];
    console.log(allCategories);
    const res = await api.get(`/services?limit=8&category=[${allCategories}]`);
    setRecommended(res.data);
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        console.log(res.data.service.editable);
        setService(res.data.service);
        setUserMain(res.data.service.editable);
        setImages(res.data.service.image);
        setUpdate(!update);
        console.log(res.data.service);
        setAllCategories(res.data.service.category);
        // res.data.service.category.map((category) => {
        //   if (typeof category === 'string') {
        //     return allCategories.push(category);
        //   }
        //   return null;
        // })
        console.log(allCategories);
        recommendSideBox();
      } catch (error) {
        toast.error(error);
      }
    };

    fetchService();
  }, []);

  // useEffect(async () => {
  //   if (service !== []) {
  //     try {
  //       const res = await api.get(`/images/${id}`);
  //       setImages(res);
  //     } catch (error) {
  //       toast.error('Erro ao carregar imagem.');
  //     }
  //   }
  // }, [service]);

  useEffect(() => {
    const fetchService = async () => {
      const res = await api.get(`/services/${id}/ratings`);
      setRating(res.data.ratings);
    };

    fetchService();
  }, [update]);

  const handleRate = () => {
    api.post(`/services/${id}/ratings`, { stars, description });
    setUpdate(!update);
  };

  return (
    <Background>
      <Container>
        <Title>{service.name}</Title>
        <CategoryList>
          {allCategories
            ? allCategories.map((serviceNew) => (
                <Category key={allCategories.indexOf(serviceNew)}>
                  {serviceNew}
                </Category>
              ))
            : null}
          <Slogan>{service.slogan}</Slogan>
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
        </CategoryList>

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
            Outros resultados para {allCategories}
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
                <DivUserRating>
                  <LabelUserTitle for='username'>Usuário</LabelUserTitle>
                  <UserInfo id='username'>
                    <span>{item.user}</span>
                  </UserInfo>
                </DivUserRating>
                <DivUserRating>
                  <LabelUserTitle for='description'>Descrição</LabelUserTitle>
                  <UserComment for='description'>
                    {item.description}
                  </UserComment>
                </DivUserRating>
                <UserStars>
                  {item.stars}
                  <BsStarFill
                    color='F5CE6A'
                    size='20px'
                    style={{ marginLeft: '3px', marginBottom: '3px' }}
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
              <InputnLabel width='10%'>
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
