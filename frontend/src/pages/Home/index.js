/* eslint-disable no-console */
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
import { FaGlassMartini, FaSuitcase } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
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
import api from '../../services/api';
import Loading from '../../Components/Loading';
import List from '../../Components/List';

const IS_SELECTED_DEFAULT = {
  jardinagem: false,
  pedreiro: false,
  garçom: false,
  alimentação: false,
};

const BUTTON_FILTERS = [
  { name: 'Jardinagem', icon: <GiFlowerEmblem /> },
  { name: 'Pedreiro', icon: <GiTrowel /> },
  { name: 'Garçom', icon: <FaGlassMartini /> },
  { name: 'Alimentação', icon: <GiKnifeFork /> },
];

const FILTER_OPTIONS = [
  'Agricultura',
  'Jardinagem',
  'Animais',
  'Beleza',
  'Casa',
  'Construção',
  'Decoração',
  'Comunicação',
  'Artes',
  'Festas',
  'Eventos',
  'Ensino',
  'Moda',
  'Saúde',
  'Esportes',
  'Telefonia',
  'Informática',
  'Variedades',
  'Veículos',
  'Viagem',
  'Turismo',
  'Outros Serviços',
  'Ferramentas',
  'Produtos Agrícolas',
  'Serviços de poda',
  'Jardinagem',
  'Açogue',
  'Frigorífico',
  'Bar',
  'Bolos',
  'Doces',
  'Tortas',
  'Bomboniere',
  'Buffet',
  'Cestas para café da manhã',
  'Cozinheiro(a)',
  'Distribuidor de água',
  'Conveniência',
  'Bebidas em geral',
  'Espetinhos',
  'Hamburgueria',
  'Hortifruti',
  'Lanches e salgados',
  'Marmitas',
  'Quentinhas',
  'Padaria',
  'Pescados',
  'Pizzaria',
  'Polpas de fruta',
  'Produtos naturais',
  'Orgânicos',
  'Queijeiro(a)',
  'Mantegueiro(a)',
  'Quiosque',
  'Restaurante',
  'Sorveteria',
  'Açaiteria',
  'Supermercado',
  'Mini-box',
  'Suplementos alimentares',
  'Banho de animais domésticos',
  'Tosa de animais domésticos',
  'Clínica Veterinária',
  'Pet Shop',
  'Ração',
  'Barbearia',
  'Cabeleireiro(a)',
  'Depilação',
  'Designer de sobrancelhas',
  'Estética',
  'Manicure',
  'Peticure',
  'Maquiador(a)',
  'Perfumaria',
  'Cosméticos',
  'Produtos de beleza',
  'Artigos de cama mesa e banho',
  'Carpinteiro',
  'Cerâmica',
  'Chaveiro',
  'Decoração',
  'Distribuidor de gás de cozinha',
  'Eletricista',
  'Eletrodomésticos',
  'Eletroeletrônicos',
  'Encanador',
  'Estofador',
  'Ferreiro',
  'Gesseiro',
  'Instalação de antenas de TV',
  'Lavador(a) de colchões e estofados',
  'Madeireira',
  'Manutenção de eletrodomésticos',
  'Marceneiro',
  'Material de construção',
  'Material elétrico',
  'Hidráulico',
  'Movelaria',
  'Montador de móveis',
  'Pedreiro',
  'Pintos de parede',
  'Produtos de limpeza',
  'Reparo de máquinas e aparelhos de refrigeração',
  'Serralharia',
  'Vidraçaria',
  'Artista plástico',
  'Designer gráfico',
  'Editor de jornais',
  'Assessor(a) de imprensa',
  'Editor(a) de vídeos',
  'Fotografo(a)',
  'Freelancer',
  'Gráfica',
  'Impressão digital',
  'Locutor(a)',
  'Manutenção de TV',
  'Manutenção de rádio',
  'Manutenção de som',
  'Produtor(a) de conteúdo digital',
  'Serigrafia',
  'Servios de marketing',
  'Web designer',
  'Animador de festa infantil',
  'Artigos para festas',
  'Cantor(a)',
  'Banda Musical',
  'Instrumentista',
  'Musicista',
  'Salão de festas',
  'Salão de jogos',
  'Instrutor(a) de cursos preparatórios',
  'Instrutor(a) de dança',
  'Instrutor(a) de música',
  'Professor(a) particular',
  'Revisor(a) de trabalhos acadêmicos',
  'Aluguel de vestuário social',
  'Bijuterias',
  'Jóias e semi-jóias',
  'Bolsas e acessórios',
  'Calçados',
  'Costureira',
  'Relojoeiro(a)',
  'Roupas íntimas e acessórios',
  'Sapateiro(a)',
  'Tecidos e aviamentos',
  'Vestuário e acessórios',
  'Academia',
  'Artigos esportivos',
  'Clínica Médica',
  'Clínica Odontológica',
  'Farmácia',
  'Laboratório de análises clínicas',
  'Ótica',
  'Profissional de saúde',
  'Serviços de prótese dentária',
  'Celular e acessórios',
  'Lan House',
  'Manutenção de celular',
  'Manutenção de computador',
  'Suprimentos de informática',
  'Artesanato',
  'Artigos de papelaria e escritório',
  'Brinquedos e artigos infantis',
  'Loja de variedades',
  'Promotor(a) de vendas',
  'Utilidades domésticas',
  'Adesivagem',
  'Bicicletas',
  'Borracharia',
  'Caminhoneiro(a)',
  'Funileiro',
  'Lanterneiro',
  'Lava a jato',
  'Moto-táxi',
  'Oficina mecânica',
  'Peças e acessórios para veículos',
  'Pintor de veículos',
  'Posto de combustível',
  'Táxi',
  'Transportador de mudanças',
  'Transporte alternativo',
  'Transporte escolar',
  'Aluguel de veículos',
  'Guia turístico',
  'Hotel',
  'Malas e artigos de viagem',
  'Pousada',
  'Restaurante',
  'Certificadora',
  'Escritório de advocacia',
  'Escritório de contabilidade',
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

  const [resultSearch, setResultSearch] = useState([]);
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
    // console.log(searchText);
    try {
      const query = Object.keys(
        Object.fromEntries(
          // eslint-disable-next-line no-unused-vars
          Object.entries(isSelectedFilter).filter(([key, value]) =>
            Boolean(value)
          )
        )
      );
      api
        .get(`/services/search?${searchText}&category=${query}`, {
          isSelectedFilter,
          pages,
          limit: 6,
          currentPage,
        })
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          setResultSearch(response.data.results);
          setPages(response.data.pages);
        });
    } catch (error) {
      toast.error(`Não foi possível realizar a busca: ${error.message}`);
    }
  };

  useEffect(() => {
    if (wasSearched) {
      handleSearch();
    }
  }, [currentPage]);

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
        { name: newFilter, icon: <FaSuitcase /> },
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
