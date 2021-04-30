import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Container, Login, StyledButton, Title } from './styles';

const SingIn = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSingIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Informe um e-mail e uma senha para efetuar login.');
    } else {
      try {
        const response = await api.post('/sessions', { email, password });
        login(response.data.token);
        history.push('/app');
      } catch (error) {
        toast.error(
          'Houve um problema com o login. Verifique suas credencias e tente novamente.'
        );
      }
    }
  };

  return (
    <Container>
      <Login>
        <Form onSubmit={handleSingIn} className='w-75'>
          <Title>Login</Title>
          <FormGroup>
            <Label for='inputEmail'>E-mail</Label>
            <Input
              type='email'
              id='inputEmail'
              placeholder='email@email.com'
              onChange={(emailValue) => {
                setEmail(emailValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for='inputPassword'>Senha</Label>
            <Input
              type='password'
              id='inputPassword'
              onChange={(passwordValue) => {
                setPassword(passwordValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <StyledButton type='submit' outline className='w-100'>
              FAZER LOGIN
            </StyledButton>
            <FormText color='muted'>
              Esqueceu suas informações de login? Clique aqui.
            </FormText>
          </FormGroup>
        </Form>
      </Login>
    </Container>
  );
};

export default SingIn;
