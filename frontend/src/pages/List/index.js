import React, { useState, useEffect } from 'react';
import Services from '../../Components/Services';
import PaginationComponent from '../../Components/Pagination';
import api from '../../services/api';
import { Container } from './styles';

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
    <Container>
      <div>
        <h2>Resultados</h2>
        <Services services={currentService} loading={loading} />
        <PaginationComponent
          servicesPerPage={servicesPerPage}
          totalServices={services.length}
          paginate={paginate}
        />
      </div>
      <main />
    </Container>
  );
};

export default List;
