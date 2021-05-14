import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import categories from './categories';
import api from '../../../services/api';
import { Container, Title, ButtonStyle, Register, FormButton } from './styles';

const RegisterBusiness = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState('');

  useEffect(() => {
    if (serviceId !== '') history.push(`/services/${serviceId}`);
  }, [serviceId]);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!name || !street || !neighborhood || !cnpj) {
      toast.error(
        'Informe todos os dados marcados com um * para cadastrar sua empresa'
      );
    } else {
      try {
        api
          .post('/services/register', {
            name,
            street,
            neighborhood,
            category,
            description,
            slogan,
            cnpj,
            whatsapp,
            instagram,
            email,
          })
          .then((response) => {
            // eslint-disable-next-line no-underscore-dangle
            setServiceId(response.data.service._id);
            history.push('/uploadphotos');
          });
      } catch (error) {
        toast.error(
          'Houve um problema com o cadastro do seu negócio. Tente novamente mais tarde'
        );
      }
    }
  };
  return (
    <Container>
      <Register>
        <Form onSubmit={handleRegisterUser} className='w-75'>
          <Title>Cadastro do negócio</Title>
          <Row>
            <Col lg='6'>
              <FormGroup>
                <Label>Nome *</Label>
                <Input
                  type='text'
                  id='inputName'
                  onChange={(nameValue) => {
                    setName(nameValue.target.value);
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
                <Label>Rua *</Label>
                <Input
                  type='street'
                  id='inputStreet'
                  onChange={(streetValue) => {
                    setStreet(streetValue.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg='6'>
              <FormGroup>
                <Label>Bairro *</Label>
                <Input
                  type='text'
                  id='inputNeighborhood'
                  onChange={(neighborhoodValue) => {
                    setNeighborhood(neighborhoodValue.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg='6'>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type='text'
                  id='inputDescription'
                  onChange={(descriptionValue) => {
                    setDescription(descriptionValue.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg='6'>
              <FormGroup>
                <Label>Slogan</Label>
                <Input
                  type='text'
                  id='inputSlogan'
                  onChange={(sloganValue) => {
                    setSlogan(sloganValue.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>CNPJ *</Label>
            <Input
              type='number'
              id='inputCnpj'
              onChange={(cnpjValue) => {
                setCnpj(cnpjValue.target.value);
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
              onChange={(emailValue) => {
                setEmail(emailValue.target.value);
              }}
            />
          </FormGroup>
          <FormButton>
            <ButtonStyle type='submit' outline className='w-10'>
              Cadastrar
            </ButtonStyle>
          </FormButton>
        </Form>
      </Register>
    </Container>
  );
};

export default RegisterBusiness;
