/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import api from '../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Title, StyledButton, Register, FormButton } from './styles';

const RegisterUser = () => {
  // const history = useHistory();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !password) {
      toast.error('Informe todos os seus dados para realizar o cadastro');
    } else {
      try {
        api
          .post('/register', {
            name,
            lastName,
            email,
            password,
            birthDay,
            confirmPassword,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      } catch (error) {
        toast.error(
          'Houve um problema com seu cadastro. Verifique novamente seus dados'
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
              onChange={(lastNameValue) => {
                setLastName(lastNameValue.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Data de Nascimento</Label>
            <br />
            <DatePicker
              selected={birthDay}
              onChange={(date) => setBirthDay(date)}
              dateFormat='dd/MM/yyyy'
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
            <Input
              type='password'
              id='confirmPassword'
              onChange={(confirmPasswordValue) => {
                setConfirmPassword(confirmPasswordValue.target.value);
              }}
            />
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
