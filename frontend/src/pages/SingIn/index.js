import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Container, Login } from './styles';

const SingIn = () => {
  const history = useHistory();

  const handleSingIn = async (e) => {
    e.preventDefault();
    const { email, password } = e;

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
        <div w='70%'>
          <FormGroup>
            <Label for='inputEmail'>E-mail</Label>
            <Input type='email' id='inputEmail' placeholder='email@email.com' />
          </FormGroup>
          <FormGroup>
            <Input />
          </FormGroup>
          <FormGroup>
            <Button onClick={(e) => handleSingIn(e)}>FAZER LOGIN</Button>
          </FormGroup>
        </div>
      </Login>
    </Container>
  );
};

export default SingIn;
