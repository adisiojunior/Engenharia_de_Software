import React, { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import LogoMicroExplorer from '../../assets/LOGO MICRO EXPLORER 04.png';
import { StyledImg, Div, Login, LogoutButton, CreateButton } from './styles';
import { getToken, logout } from '../../services/auth';
import api from '../../services/api';

const NavBar = () => {
  const [user, setUser] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = getToken();
  // const [services, setServices] = useState();

  useEffect(() => {
    if (token !== null && token !== undefined) setUser(true);
    else setUser(false);
    console.log(user);
  }, [modalIsOpen]);

  const handleLogout = () => {
    api.put('/users/auth/logout');
    logout();
    setModalIsOpen(false);
  };

  return (
    <Navbar expand='lg' color='white' light fixed='top' className='shadow'>
      <Div>
        <Container className='m-0'>
          <div className='navbar-translate'>
            <a href='/'>
              <StyledImg src={LogoMicroExplorer} alt='Micro Explorer' />
              <NavbarBrand>Micro Explorer</NavbarBrand>
            </a>
            <NavbarToggler>
              <span className='navbar-toggler-bar navbar-kebab' />
              <span className='navbar-toggler-bar navbar-kebab' />
              <span className='navbar-toggler-bar navbar-kebab' />
            </NavbarToggler>
          </div>
        </Container>

        <div>
          {!user ? (
            <Login type='button'>
              <a href='/login'>Entrar</a>
            </Login>
          ) : (
            <Login type='button' onClick={() => setModalIsOpen(!modalIsOpen)}>
              <p>User123</p>
            </Login>
          )}
        </div>
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
            <div>
              {}
              <CreateButton type='button' onClick={handleLogout}>
                + Criar Negócio
              </CreateButton>
            </div>
          </ModalBody>
          <ModalFooter>
            <LogoutButton type='button' onClick={handleLogout}>
              Deslogar
            </LogoutButton>
          </ModalFooter>
        </Modal>
      </Div>
    </Navbar>
  );
};

export default NavBar;
