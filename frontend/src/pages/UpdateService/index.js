import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { toast } from 'react-toastify';
import {
  Container,
  Register,
  ButtonStyle,
  ButtonDeleteStyle,
  Title,
} from './styles';
import api from '../../services/api';

const UpdateService = () => {
  const { slug } = useParams();
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [image, setImage] = useState('');
  const history = useHistory();

  useEffect(async () => {
    // eslint-disable-next-line no-unused-vars
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${slug}`);
        setName(res.data.service.name);
        setCategory(res.data.service.category);
        setImage(res.data.service.image);
        setStreet(res.data.service.street);
        setNeighborhood(res.data.service.neighborhood);
        setDescription(res.data.service.description);
        setSlogan(res.data.service.slogan);
        setCnpj(res.data.service.cnpj);
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
      return useHistory(`/services/${slug}`);
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
            <ButtonStyle type='submit' outline className='w-100'>
              Atualizar
            </ButtonStyle>
            <ButtonDeleteStyle
              type='button'
              outline
              className='w-100'
              onClick={handleDelete}
            >
              Excluir
            </ButtonDeleteStyle>
          </FormGroup>
        </Form>
      </Register>
    </Container>
  );
};

export default UpdateService;
