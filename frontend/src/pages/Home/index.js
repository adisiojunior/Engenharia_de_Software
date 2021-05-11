import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { GiTrowel, GiKnifeFork, GiFlowerEmblem } from 'react-icons/gi';
import { FaGlassMartini } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import {
  Container,
  SearchDiv,
  Title,
  Description,
  StyledButton,
  StyledButtonFilter,
  Buttons,
  InputSearch,
  Subtitle,
  StyledRow,
} from './styles';
import api from '../../services/api';

const IS_SELECTED_DEFAULT = {
  jardineiro: false,
  pedreiro: false,
  garçom: false,
  alimentação: false,
};

const BUTTON_FILTERS = [
  { name: 'Jardineiro', icon: <GiFlowerEmblem /> },
  { name: 'Pedreiro', icon: <GiTrowel /> },
  { name: 'Garçom', icon: <FaGlassMartini /> },
  { name: 'Alimentação', icon: <GiKnifeFork /> },
];

const FILTER_OPTIONS = ['Beleza', 'Moda', 'Educação', 'Tecnologia'];

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [isSelectedFilter, setIsSelectedFilter] = useState(IS_SELECTED_DEFAULT);
  const [filterOptions, setFilterOptions] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    // TODO: change to get this informations from backend
    setFilterOptions(FILTER_OPTIONS);
  }, []);

  useEffect(() => {
    console.log(isSelectedFilter);
  }, [isSelectedFilter]);

  const handleSearch = () => {
    api.get(
      `/seach?${searchText}`,
      {
        isSelectedFilter,
      }.then((result) => {
        console.log(result);
      })
    );
    return searchText + modalIsOpen;
  };

  const setFilter = (filter) => {
    setIsSelectedFilter({
      ...isSelectedFilter,
      [filter]: isSelectedFilter[filter] ? !isSelectedFilter[filter] : true,
    });
  };

  const savechangesOnfilter = () => {
    setFilter(newFilter);
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Container>
      <SearchDiv>
        <StyledRow marginTop='80px'>
          <Form onSubmit={handleSearch}>
            <Title>O seu buscador de micro e pequenas empresas locais</Title>
            <FormGroup>
              <Subtitle for='inputSearchText'>O que você procura?</Subtitle>
              <InputSearch
                type='searchText'
                id='inputSearchText'
                placeholder='Pesquise aqui o produto ou serviço desejado'
                className='shadow'
                onChange={(searchTextValue) => {
                  setSearchText(searchTextValue.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Filtrar por:</Label>
              <Buttons>
                {BUTTON_FILTERS.map((element) => {
                  return (
                    <StyledButtonFilter
                      onClick={() => setFilter(element.name)}
                      isSelected={isSelectedFilter[element.name]}
                    >
                      {element.icon || ''}
                      {element.name}
                    </StyledButtonFilter>
                  );
                })}
                <StyledButtonFilter
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                >
                  <MdAdd />
                  Categoria
                </StyledButtonFilter>
              </Buttons>
            </FormGroup>
            <FormGroup>
              <StyledButton type='submit' outline className='w-100'>
                <BsSearch /> BUSCAR
              </StyledButton>
            </FormGroup>
          </Form>
        </StyledRow>
        <StyledRow marginTop='0'>
          <Description>
            Nunca foi tão fácil localizar os comércios e serviços da sua cidade.
            O Micro Explorer te ajuda e você ajuda os pequenos negócios a
            crescer.
            <br />
            <a href='/registerUser'>Clique aqui</a> e cadastre-se agora!
          </Description>
        </StyledRow>
      </SearchDiv>
      <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(!modalIsOpen)}>
        <div className='modal-header justify-content-center'>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
            onClick={() => setModalIsOpen(!modalIsOpen)}
          >
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <ModalBody>
          <Subtitle for='filters'>Adiconar filtro:</Subtitle>
          <Input
            type='select'
            id='filters'
            onChange={(element) => setNewFilter(element.target.value)}
          >
            {filterOptions.map((element) => {
              return (
                <option id={element} value={element}>
                  {element}
                </option>
              );
            })}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color='secondary'
            onClick={() => setModalIsOpen(!modalIsOpen)}
          >
            Fechar
          </Button>
          <Button color='primary' onClick={savechangesOnfilter}>
            Aplicar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Home;
