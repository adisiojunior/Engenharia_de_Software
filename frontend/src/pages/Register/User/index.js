import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import api from '../../../services/api';
// import { login } from '../../../services/auth';
import { Container, Title, StyledButton, Register, Buttons } from './styles';

export const RegisterUser = () => {
  const history = useHistory();

  const [name, setName] = useState('');

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Informe o nome para realizar o registro');
    }
    try {
      await api.post('/register', {
        name,
      });
      history.push('/app');
    } catch (error) {
      toast.error(
        'Houve um problema com seu cadastro. Preencha todos os campos corretamente'
      );
    }
  };
  return (
    <Container>
      <Register>
        <Form onSubmit={handleRegisterUser} className='w-75'>
          <Title>Cadastro do usuário</Title>
          <FormGroup>
            <Label>Nome</Label>
            <Input
              type='text'
              id='inputName'
              placheholder='Nome'
              onChange={(nameValue) => {
                setName(nameValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Sobrenome</Label>
            <Input type='text' id='inputLastname' placheholder='Sobrenome' />
          </FormGroup>
          <FormGroup>
            <Label>E-mail</Label>
            <Input type='email' id='inputEmail' placheholder='E-mail' />
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <Input type='password' id='inputPassword' placheholder='Senha' />
          </FormGroup>
          <FormGroup>
            <Label>Confirme a sua senha</Label>
            <Input
              type='password'
              id='confirmPassword'
              placheholder='Confirme a sua senha'
            />
          </FormGroup>
          <Buttons>
            <StyledButton type='submit' outline className='w-50'>
              Cadastrar
            </StyledButton>
            <StyledButton type='submit' outline className='w-50'>
              Cadastrar Empresa
            </StyledButton>
          </Buttons>
        </Form>
      </Register>
    </Container>
  );
};

export default RegisterUser;
