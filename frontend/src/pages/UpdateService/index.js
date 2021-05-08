import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { toast } from 'react-toastify';
import { Container, Login, StyledButton, Title } from './styles';
import api from '../../services/api';

const UpdateService = async () => {
  const { slug } = useParams();
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  // const [image, setImage] = useState(currentImage);
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [image, setImage] = useState('');

  try {
    const service = await api.get(`/services/${slug}`);
    setName(service.name);
    setCategory(service.category);
    setImage(service.image);
    setStreet(service.street);
    setNeighborhood(service.neighborhood);
    setDescription(service.description);
    setSlogan(service.slogan);
    setCnpj(service.cnpj);
  } catch (error) {
    toast.error('Esse serviço não existe.');
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts');
      await api.put(`/services/${slug}`, {
        name,
        category,
        image,
        street,
        neighborhood,
        description,
        slogan,
        cnpj,
      });
      return useHistory(`/service/${slug}`);
    } catch (error) {
      return toast.error('Erro na atualização dos dados de comércio.');
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      api.delete(`/services/delete/${slug}`);
      return useHistory('/list');
    } catch (error) {
      return toast.error('Erro ao deletar comércio/serviço.');
    }
  };

  return (
    <Container>
      <Login>
        <Form onSubmit={handleUpdate} className='w-75'>
          <Title>Atualizar Comércio</Title>
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
          <FormGroup>
            <Label for='inputCategoria'>Categoria</Label>
            <Input
              type='text'
              id='inputCategoria'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for='inputImage'>Imagem</Label>
            <Input
              type='file'
              name='file'
              id='inputImage'
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
            <FormText color='muted'>
              Selecione o arquivo png ou jpeg da imagem do seu
              estabelecimento/serviço.
            </FormText>
          </FormGroup>
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
          <FormGroup>
            <StyledButton type='submit' outline className='w-100'>
              Atualizar
            </StyledButton>
          </FormGroup>
          <FormGroup>
            <StyledButton
              type='button'
              outline
              className='w-100'
              onClick={handleDelete}
            >
              Excluir
            </StyledButton>
          </FormGroup>
        </Form>
      </Login>
    </Container>
  );
};

export default UpdateService;
