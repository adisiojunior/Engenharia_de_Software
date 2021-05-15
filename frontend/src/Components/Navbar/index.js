/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Modal,
} from 'reactstrap';
import { toast } from 'react-toastify';
import LogoMicroExplorer from '../../assets/LOGO MICRO EXPLORER 04.png';
import {
  StyledImg,
  Div,
  Login,
  LogoutButton,
  CreateButton,
  NewModalFooter,
  DivServices,
  ServiceButton,
  ModalTitle,
} from './styles';
import { getToken, logout } from '../../services/auth';
import api from '../../services/api';

const NavBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userServices, setUserServices] = useState([]);

  useEffect(async () => {
    if (getToken() !== undefined && getToken() !== null)
      try {
        const res = await api.get(`/users/auth/get`);
        setUserName(res.data.user.name);
        setUserId(res.data.user._id);
        const response = await api.get('/getServicesByUser');
        setUserServices(response.data.result);
      } catch (error) {
        toast.error(`Erro encontrado: ${error.message}`);
      }
  }, [modalIsOpen, userName]);

  const handleLogout = () => {
    api.put('/users/auth/logout');
    logout();
    setModalIsOpen(false);
    toast.success('Sessão encerrada.');
    window.location.reload('/');
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
              <strong>{userName || 'Entrar'}</strong>
            </Login>
          )}
        </div>
        <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(!modalIsOpen)}>
          <div className='modal-header justify-content-center'>
            <ModalTitle>Serviços</ModalTitle>
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
          <DivServices>
            {userServices.length > 0 ? (
              userServices.map((service) => {
                return (
                  <a href={`/services/${service._id}`}>
                    <ServiceButton type='button'>{service.name}</ServiceButton>
                  </a>
                );
              })
            ) : (
              <div>
                <p>
                  Se você possui algum serviço cadastrado, espere um momento.
                </p>
              </div>
            )}
          </DivServices>
          <NewModalFooter>
            <a href='/registerbusiness'>
              <CreateButton type='button'>+ Criar Negócio</CreateButton>
            </a>{' '}
            <a href={`/user/edit/${userId}`}>
              <CreateButton type='button'>Editar Perfil</CreateButton>
            </a>
            <LogoutButton type='button' onClick={handleLogout}>
              Encerrar sessão
            </LogoutButton>
          </NewModalFooter>
        </Modal>
      </Div>
    </Navbar>
  );
};

export default NavBar;
