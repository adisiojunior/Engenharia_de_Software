import React, { useState, useEffect } from 'react';
import Services from '../../Components/Services';
import PaginationComponent from '../../Components/Pagination';
import api from '../../services/api';
import {
  Container,
  Category,
  Filtros,
  Background,
  Title,
  StyledButton,
} from './styles';

const List = () => {
  // const [search, setSearch] = useState();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const res = await api.get('/services');
      setServices(res.data);
      setLoading(false);
    };

    fetchService();
  }, []);

  // function handleToService(e) {}

  // Get current services
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentService = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Background>
      <Title>Resultados para busca de restaurantes</Title>
      <Container>
        <section>
          <Filtros>
            <h3>Filtros</h3>
            <Category>
              <StyledButton>Centro</StyledButton>
              <StyledButton>Restaurantes</StyledButton>
            </Category>
          </Filtros>
          <h2>Resultados</h2>
          <ul>
            <Services services={currentService} loading={loading} />
            <PaginationComponent
              servicesPerPage={servicesPerPage}
              totalServices={services.length}
              paginate={paginate}
            />
          </ul>
        </section>
        <main />
      </Container>
    </Background>
  );
};

export default List;
