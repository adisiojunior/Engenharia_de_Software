/* eslint-disable no-underscore-dangle */
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
import {
  Background,
  Container,
  Title,
  Address,
  Contacts,
  Details,
  // Highlights,
  Info,
  Photo,
  // Recommended,
  Category,
  CategoryList,
  // RecommendedRating,
  UserInfo,
  // RecommendedName,
  // RecommendedTitle,
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
  DivUsernDescription,
  DivSlogan,
} from './styles';

const Service = () => {
  const [userMain, setUserMain] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [service, setService] = useState([]);
  // const [recommended, setRecommended] = useState([]);
  const [rating, setRating] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState([]);
  const [stars, setStars] = useState([]);
  const [update, setUpdate] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  // const chosenCategory = () => {
  //   return allCategories[Math.floor(Math.random() * allCategories.length)];
  // };

  // const recommendSideBox = async () => {
  //   // const arrayCategory = [chosenCategory()];
  //   console.log(allCategories);
  //   const res = await api.get(`/services?limit=8&category=[${allCategories}]`);
  //   setRecommended(res.data);
  // };
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setService(res.data.service);
        setUserMain(res.data.service.editable);
        setUpdate(!update);
        setAllCategories(res.data.service.category);
        // res.data.service.category.map((category) => {
        //   if (typeof category === 'string') {
        //     return allCategories.push(category);
        //   }
        //   return null;
        // })
        // recommendSideBox();
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
      const res = await api.get(`/service/${id}/ratings`);
      setRating(res.data.ratings);
    };

    fetchService();
  }, [update]);

  const handleRate = () => {
    try {
      if (stars > 0 && stars <= 5) {
        api.post(`/services/${id}/ratings`, { stars, description }).then(() => {
          setUpdate(!update);
          window.location.reload(`/services/${id}`);
        });
      }
    } catch (error) {
      toast.error('O campo de nota est?? com um valor inv??lido.');
    }
  };

  return (
    <Background>
      <Container>
        <Title>{service.name}</Title>
        <CategoryList>
          {allCategories
            ? allCategories.map((serviceNew) => (
                <Category key={allCategories.indexOf(serviceNew)}>
                  {serviceNew.label}
                </Category>
              ))
            : null}
          <DivSlogan>
            <Slogan>{service.slogan}</Slogan>
          </DivSlogan>
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
              <img src={service.image} alt={service.name} />
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
            <h5>Localiza????o:</h5>
            <MdLocationOn /> {service.street},{service.neighborhood}
          </Address>
        </Info>
        {/* <Recommended>
          <RecommendedTitle>
            Outros resultados para {allCategories}
          </RecommendedTitle>
          <hr />
          {recommended
            ? recommended.map((item) => (
                <Highlights key={item}>
                  <RecommendedName>{item.userId}</RecommendedName>
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
        </Recommended> */}
        <Rating>
          <RatingTitle>Avalia????es dos Clientes</RatingTitle>
          <hr />
          <RatingPlace>
            {rating.map((item) => (
              <>
                <UserRating key={item._id}>
                  <DivUsernDescription>
                    <DivUserRating>
                      <LabelUserTitle for='username'>Usu??rio</LabelUserTitle>
                      <UserInfo id='username'>
                        <span>{item.userId.name}</span>
                      </UserInfo>
                    </DivUserRating>
                    <DivUserRating>
                      <LabelUserTitle for='description'>
                        Descri????o
                      </LabelUserTitle>
                      <UserComment for='description'>
                        {item.description}
                      </UserComment>
                    </DivUserRating>
                  </DivUsernDescription>
                  <UserStars>
                    {item.stars}
                    <BsStarFill
                      color='F5CE6A'
                      size='20px'
                      style={{ marginLeft: '3px', marginBottom: '3px' }}
                    />
                  </UserStars>
                </UserRating>
                <hr />
              </>
            ))}
          </RatingPlace>
          <hr />
          <InputsAndButtonDiv>
            <InputRatesDiv>
              <InputnLabel width='90%'>
                <LabelInput for='inputDescription'>Coment??rio</LabelInput>
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
                  min={1}
                  max={5}
                  placeholder='1 - 5'
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
