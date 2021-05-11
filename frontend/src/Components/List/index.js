import React, { useState } from 'react';
import Service from '../Service';
import PaginationComponent from '../Pagination';
import { Container, Background, Title } from './styles';

const List = ({ resultSearch, maxPages, currentPageProp, setCurrentPage }) => {
  const [pages] = useState(maxPages);
  const [currentPage] = useState(currentPageProp);
  const [limit] = useState(6);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Background>
      <Title>Foram encontrados estes resultados:</Title>
      <Container>
        <section>
          <ul>
            {resultSearch.map((service) => {
              return <Service service={service} />;
            })}
            <PaginationComponent
              servicesPerPage={limit}
              pages={pages}
              currentPage={currentPage}
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
