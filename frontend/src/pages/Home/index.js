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
import { FaGlassMartini, FaHeart } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
// import { toast } from 'react-toastify';
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
  SearchResult,
} from './styles';
// import api from '../../services/api';
import Loading from '../../Components/Loading';
import List from '../../Components/List';

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

const SERVICES = [
  {name: 'Teste', image:'http://www.ifs.edu.br/images/M_images/default.png', rating: '4'},
  {name: 'Teste', image:'http://www.ifs.edu.br/images/M_images/default.png', rating: '4'},
  {name: 'Teste', image:'http://www.ifs.edu.br/images/M_images/default.png', rating: '4'},
  {name: 'Teste', image:'http://www.ifs.edu.br/images/M_images/default.png', rating: '4'},
  {name: 'Teste', image:'http://www.ifs.edu.br/images/M_images/default.png', rating: '4'},
  {name: 'Teste', image:'http://www.ifs.edu.br/images/M_images/default.png', rating: '4'},
];

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [isSelectedFilter, setIsSelectedFilter] = useState(IS_SELECTED_DEFAULT);
  const [filterOptions, setFilterOptions] = useState([]);
  const [buttonFilters, setButtonFilters] = useState(BUTTON_FILTERS);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFilter, setNewFilter] = useState('');

  const [wasSearched, setWasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [resultSearch, setResultSearch] = useState(SERVICES);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // TODO: change to get this informations from backend
    setFilterOptions(FILTER_OPTIONS);
  }, [filterOptions]);

  useEffect(() => {}, [buttonFilters]);

  const handleSearch = () => {
    setWasSearched(true);
    setIsLoading(true);
    setIsLoading(false);
    // api
    //   .get(`/seach?${searchText}`, {
    //     isSelectedFilter,
    //     pages,
    //     limit: 6,
    //     currentPage,
    //   })
    //   .then((response) => {
    //     setIsLoading(false);
    //     setResultSearch(response.resullt.data.services);
    //     setPages(response.result.data.pages);
    //   })
    //   .error((error) => {
    //     toast.error(`Não foi possível realizar a busca: ${error.message}`);
    //   });
  };

  const setFilter = (filter) => {
    setIsSelectedFilter({
      ...isSelectedFilter,
      [filter]: isSelectedFilter[filter] ? !isSelectedFilter[filter] : true,
    });
  };

  const savechangesOnfilter = () => {
    if (newFilter === 'none') {
      toast.error('Selecione uma categoria');
      return;
    }
    if (!isSelectedFilter[newFilter]) {
      setFilter(newFilter);
      setButtonFilters([
        ...buttonFilters,
        { name: newFilter, icon: <FaHeart /> },
      ]);
      setModalIsOpen(!modalIsOpen);
    } else {
      toast.error('Cateogira já adicionada');
    }
  };

  return (
    <Container>
      <SearchDiv>
        <StyledRow marginTop='80px'>
          <Form>
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
                {buttonFilters.map((element) => {
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
              <StyledButton outline className='w-100' onClick={handleSearch}>
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
            <option id='none' value='none'>
              Selecionar categoria
            </option>
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
      {wasSearched && (
        <SearchResult>
          {isLoading ? (
            <Loading />
          ) : (
            <List
              resultSearch={resultSearch}
              maxPages={pages}
              currentPageProp={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </SearchResult>
      )}
    </Container>
  );
};

export default Home;
