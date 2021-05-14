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
import { toast } from 'react-toastify';
import LogoMicroExplorer from '../../assets/LOGO MICRO EXPLORER 04.png';
import { StyledImg, Div, Login, LogoutButton, CreateButton } from './styles';
import { getToken, logout } from '../../services/auth';
import api from '../../services/api';

const NavBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(async () => {
    if (getToken() !== undefined && getToken() !== null)
      try {
        const res = await api.get(`/users/auth/get`);
        setUserName(res.data.name);
        setUserId(res.data.id);
      } catch (error) {
        toast.error(`Erro encontrado: ${error.message}`);
      }
  }, [modalIsOpen, userName]);

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
          {!window.localStorage['@airbnb-Token'] ? (
            <a href='/login'>
              <Login type='button'>
                <strong>Entrar</strong>
              </Login>
            </a>
          ) : (
            <Login type='button' onClick={() => setModalIsOpen(!modalIsOpen)}>
              <strong>{userName}</strong>
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
              <a href='/registerbusiness'>
                <CreateButton type='button'>+ Criar Negócio</CreateButton>
              </a>
              <a href={`/user/edit/${userId}`}>
                <CreateButton type='button'>Editar Perfil</CreateButton>
              </a>
            </div>
          </ModalBody>
          <ModalFooter>
            <LogoutButton type='button' onClick={handleLogout}>
              Encerrar sessão
            </LogoutButton>
          </ModalFooter>
        </Modal>
      </Div>
    </Navbar>
  );
};

export default NavBar;
