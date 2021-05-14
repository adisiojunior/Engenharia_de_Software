import React, { useState } from 'react';
import Service from '../Service';
import PaginationComponent from '../Pagination';
import { Container, BoxSearch } from './styles';

const List = ({ resultSearch, maxPages, currentPageProp, setCurrentPage }) => {
  const [pages] = useState(maxPages);
  const [currentPage] = useState(currentPageProp);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BoxSearch>
      <Container>
        {resultSearch.map((service) => {
          return <Service service={service} />;
        })}

        <main />
      </Container>
      <PaginationComponent
        pages={pages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </BoxSearch>
  );
};

export default List;
