import React, { useState } from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { GiTrowel, GiKnifeFork, GiFlowerEmblem } from 'react-icons/gi';
import { FaGlassMartini } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import {
  Container,
  SearchDiv,
  Title,
  // Description,
  // Image,
  // SearchResult,
  StyledButton,
  StyledButtonFilter,
  Buttons,
  InputSearch,
  Subtitle,
} from './styles';
// import Logo from '../../assets/LOGO MICRO EXPLORER 05.png';

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

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [isSelectedFilter, setIsSelectedFilter] = useState(IS_SELECTED_DEFAULT);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = () => {
    return searchText + modalIsOpen;
  };

  const setFilter = (filter) => {
    setIsSelectedFilter({
      ...isSelectedFilter,
      [filter]: !isSelectedFilter[filter] || true,
    });
  };

  return (
    <Container>
      <SearchDiv>
        <Form onSubmit={handleSearch} className='w-75'>
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
                    {element.icon}
                    {element.name}
                  </StyledButtonFilter>
                );
              })}
              <StyledButtonFilter onClick={() => setModalIsOpen(true)}>
                <MdAdd />
                Cateogoria
              </StyledButtonFilter>
            </Buttons>
          </FormGroup>
          <FormGroup>
            <StyledButton type='submit' outline className='w-100'>
              BUSCAR
            </StyledButton>
          </FormGroup>
        </Form>
      </SearchDiv>
      {/* <SearchResult isSearch={false}>
        <Image src={Logo} alt='search' />
        <Description>
          Empreendedor, divulgue seu negócio aqui! Junte-se à rede de contatos
          que impulsiona a economia local! Cadastre seu empreendimento agora
          mesmo e garanta mais facilidade para os clientes e consumidores
          chegarem até você! O Micro Explorer é gratuito!
        </Description>
      </SearchResult> */}
    </Container>
  );
};

export default Home;
