/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import categories from '../Register/Business/categories';
import {
  Container,
  Register,
  ButtonStyle,
  ButtonDeleteStyle,
  Title,
  ButtonGroup,
} from './styles';
import api from '../../services/api';

const UpdateService = () => {
  const { slug } = useParams();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(async () => {
    // eslint-disable-next-line no-unused-vars
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${slug}`);

        setCategory(res.data.service.category);
        setName(res.data.service.name);
        setStreet(res.data.service.street);
        setNeighborhood(res.data.service.neighborhood);
        setDescription(res.data.service.description);
        setSlogan(res.data.service.slogan);
        setCnpj(res.data.service.cnpj);
        setWhatsapp(res.data.service.whatsapp);
        setInstagram(res.data.service.instagram);
        setEmail(res.data.service.email);
      } catch (error) {
        toast.error('Esse serviço não existe.');
      }
    };
    fetchService();
  }, []);

  // try {
  //   const service = await api.get(`/services/${slug}`);
  //   setName(service.name);
  //   setCategory(service.category);
  //   setImage(service.image);
  //   setStreet(service.street);
  //   setNeighborhood(service.neighborhood);
  //   setDescription(service.description);
  //   setSlogan(service.slogan);
  //   setCnpj(service.cnpj);
  // } catch (error) {
  //   toast.error('Esse serviço não existe.');
  // }

  useEffect(() => {
    if (id !== '') history.push(`/uploadphotos/${slug}`);
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api
        .put(`/services/update/${slug}`, {
          name,
          category,
          street,
          neighborhood,
          description,
          slogan,
          cnpj,
          whatsapp,
          instagram,
          email,
        })
        .then(() => {
          localStorage.setItem('serviceId', slug);
          setId(slug);
        });
      return '';
    } catch (error) {
      return toast.error('Erro na atualização dos dados de comércio.');
    }
  };

  const handleUpdateToService = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/services/update/${slug}`, {
        name,
        category,
        street,
        neighborhood,
        description,
        slogan,
        cnpj,
        whatsapp,
        instagram,
        email,
      });
      return history.push(`/services/${slug}`);
    } catch (error) {
      return toast.error('Erro na atualização dos dados de comércio.');
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      api.delete(`/services/delete/${slug}`);
      return history.push('/list');
    } catch (error) {
      return toast.error('Erro ao deletar comércio/serviço.');
    }
  };

  return (
    <Container>
      <Register>
        <Form onSubmit={handleUpdate} className='w-75'>
          <Title>Atualizar Comércio</Title>
          <Row>
            <Col lg='6'>
              <FormGroup>
                <Label for='inputName'>Nome</Label>
                <Input
                  type='text'
                  id='inputName'
                  placeholder='Nome'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg='6'>
              <FormGroup>
                <Label>Categoria</Label>
                <Select
                  isMulti
                  name='categories'
                  options={categories}
                  onChange={setCategory}
                  className='basic-multi-select'
                  classNamePrefix='select'
                  placeholder='Selecione'
                  isSearchable
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg='6'>
              <FormGroup>
                <Label for='inputStreet'>Rua</Label>
                <Input
                  type='text'
                  id='inputStreet'
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg='6'>
              <FormGroup>
                <Label for='inputNeighborhood'>Bairro</Label>
                <Input
                  type='text'
                  id='inputNeighborhood'
                  value={neighborhood}
                  onChange={(e) => {
                    setNeighborhood(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg='6'>
              <FormGroup>
                <Label for='inputDescription'>Descrição</Label>
                <Input
                  type='text'
                  id='inputDescription'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg='6'>
              <FormGroup>
                <Label for='inputSlogan'>Slogan</Label>
                <Input
                  type='text'
                  id='inputSlogan'
                  value={slogan}
                  onChange={(e) => {
                    setSlogan(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for='inputCnpj'>CNPJ</Label>
            <Input
              type='text'
              id='inputCnpj'
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
            />
          </FormGroup>
          <Row>
            <Col lg='6'>
              <FormGroup>
                <Label>Whatsapp</Label>
                <Input
                  type='number'
                  id='inputNumber'
                  value={whatsapp}
                  onChange={(whatsappValue) => {
                    setWhatsapp(whatsappValue.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg='6'>
              <FormGroup>
                <Label>Instagram</Label>
                <Input
                  type='text'
                  id='inputInstagram'
                  value={instagram}
                  onChange={(instagramValue) => {
                    setInstagram(instagramValue.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>E-mail</Label>
            <Input
              type='email'
              id='inputEmail'
              value={email}
              onChange={(emailValue) => {
                setEmail(emailValue.target.value);
              }}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label for='inputWhatsapp'>Whatsapp</Label>
            <Input
              type='text'
              id='inputWhatsapp'
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for='inputInstagram'>Instagram</Label>
            <Input
              type='text'
              id='inputInstagram'
              value={instagram}
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
            />
          </FormGroup> */}
          <ButtonGroup>
            <ButtonStyle type='submit' outline className='w-100'>
              Editar foto
            </ButtonStyle>
            <ButtonStyle
              type='button'
              onClick={handleUpdateToService}
              outline
              className='w-100'
            >
              Confirmar
            </ButtonStyle>
            <ButtonDeleteStyle
              type='button'
              outline
              className='w-100'
              onClick={handleDelete}
            >
              Excluir
            </ButtonDeleteStyle>
          </ButtonGroup>
        </Form>
      </Register>
    </Container>
  );
};

export default UpdateService;
