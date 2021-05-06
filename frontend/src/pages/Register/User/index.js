import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import api from '../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Title, ButtonStyle, Register, FormButton } from './styles';

setDefaultLocale('pt');
export const RegisterUser = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Informe seu nome para realizar o registro');
    }
    if (!lastname) {
      toast.error('Informe seu sobrenome para realizar o registro');
    }
    if (!email) {
      toast.error('Informe seu e-mail para realizar o registro');
    }
    if (!password) {
      toast.error('Informe uma senha para realizar o registro');
    } else {
      try {
        await api.post('/register', {
          name,
          lastname,
          email,
          password,
        });
        history.push('/app');
      } catch (error) {
        toast.error(
          'Houve um problema com seu cadastro. Tente novamente mais tarde'
        );
      }
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
              onChange={(nameValue) => {
                setName(nameValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Sobrenome</Label>
            <Input
              type='text'
              id='inputLastname'
              onChange={(lastnameValue) => {
                setLastname(lastnameValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Data de Nascimento</Label>
            <br />
            <DatePicker
              locale='pt'
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </FormGroup>
          <FormGroup>
            <Label>E-mail</Label>
            <Input
              type='email'
              id='inputEmail'
              onChange={(emailValue) => {
                setEmail(emailValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <Input
              type='password'
              id='inputPassword'
              onChange={(passwordValue) => {
                setPassword(passwordValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirme a sua senha</Label>
            <Input type='password' id='confirmPassword' />
          </FormGroup>
          <FormButton>
            <ButtonStyle type='submit' outline className='w-10'>
              Cadastrar
            </ButtonStyle>
          </FormButton>
        </Form>
        <ButtonStyle type='submit' outline className='w-10'>
          Cadastrar Empresa
        </ButtonStyle>
      </Register>
    </Container>
  );
};

export default RegisterUser;
