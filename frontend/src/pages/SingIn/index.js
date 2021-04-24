import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Container, Login } from './styles';

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
          <Button type='submit' color='primary' outline className='w-100'>
            FAZER LOGIN
          </Button>
        </Form>
      </Login>
    </Container>
  );
};

export default SingIn;
