import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import api from '../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Title, StyledButton, Register, FormButton } from './styles';

setDefaultLocale('pt');
const RegisterUser = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword] = useState('');

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!name || !lastname || !email || !password) {
      toast.error('Informe todos os seus dados para realizar o cadastro');
    } else if (password !== confirmPassword) {
      toast.error('Senhas diferentes');
    } else {
      try {
        await api.post('/register', {
          name,
          lastname,
          email,
          password,
        });
        history.push('/');
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
            <StyledButton type='submit' outline className='w-10'>
              Cadastrar
            </StyledButton>
          </FormButton>
        </Form>
        <Link to='/RegisterBusiness'>
          <StyledButton type='submit' outline className='w-10'>
            Cadastrar Empresa
          </StyledButton>
        </Link>
      </Register>
    </Container>
  );
};

export default RegisterUser;
