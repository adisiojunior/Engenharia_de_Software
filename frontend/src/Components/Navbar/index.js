import React from 'react';
import { Container, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

const NavBar = () => {
  return (
    <Navbar expand='lg' color='white' light fixed='top' className='shadow m-0'>
      <Container>
        <div className='navbar-translate'>
          <NavbarBrand>Micro Explorer</NavbarBrand>
          <NavbarToggler>
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
          </NavbarToggler>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
