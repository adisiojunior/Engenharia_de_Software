import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import categories from './categories';
import api from '../../../services/api';
import { Container, Title, ButtonStyle, Register, FormButton } from './styles';

const RegisterBusiness = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [category] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !category ||
      !street ||
      !neighborhood ||
      !description ||
      !slogan ||
      !cnpj
    ) {
      toast.error(
        'Informe todos os dados do seu negócio para realizar o cadastro'
      );
    } else {
      try {
        await api.post('/services/register', {
          name,
          category,
          street,
          neighborhood,
          description,
          slogan,
          cnpj,
        });
        history.push('/app');
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
          <FormGroup>
            <Label>Nome</Label>
            <Input
              type='text'
              id='inputName'
              onChange={(nameValue) => {
                setName(nameValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Categoria</Label>
            <Select
              isMulti
              name='categories'
              options={categories}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Selecione'
              // onChange={(categoryValue) => {
              //   setCategory(categoryValue.target.value);
              // }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Rua</Label>
            <Input
              type='street'
              id='inputStreet'
              onChange={(streetValue) => {
                setStreet(streetValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Bairro</Label>
            <Input
              type='text'
              id='inputNeighborhood'
              onChange={(neighborhoodValue) => {
                setNeighborhood(neighborhoodValue.target.value);
              }}
            />
          </FormGroup>
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
          <FormGroup>
            <Label>CNPJ</Label>
            <Input
              type='text'
              id='inputCnpj'
              onChange={(cnpjValue) => {
                setCnpj(cnpjValue.target.value);
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
