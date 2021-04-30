import React from 'react';
import { Container, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import LogoMicroExplorer from '../../assets/LOGO MICRO EXPLORER 04.png';
import { StyledImg } from './styles';

const NavBar = () => {
  return (
    <Navbar expand='lg' color='white' light fixed='top' className='shadow'>
      <Container className='m-0'>
        <div className='navbar-translate'>
          <StyledImg src={LogoMicroExplorer} alt='Micro Explorer' />
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
