import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Div } from './styles';

const PaginationComponent = ({ pages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Div>
      <Pagination>
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink href='#' onClick={() => paginate(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </Div>
  );
};

export default PaginationComponent;
