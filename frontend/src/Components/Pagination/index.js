import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const PaginationComponent = ({
  servicesPerPage,
  totalServices,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <PaginationItem key={number}>
          <PaginationLink href='#' onClick={() => paginate(number)}>
            {number}
          </PaginationLink>
          ;
        </PaginationItem>
      ))}
    </Pagination>
  );
};
