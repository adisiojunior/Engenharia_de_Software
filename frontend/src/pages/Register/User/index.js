/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import api from '../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Title, StyledButton, Register, FormButton } from './styles';

const RegisterUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (id) {
      try {
        api.get('/users/auth/get').then((result) => {
          setName(result.data.user.name);
          setLastName(result.data.user.lastName);
          setBirthDay(result.data.user.birthDay);
          setEmail(result.data.user.email);
        });
      } catch (error) {
        toast.error(`Não foi possível encontrar usuário: ${error}`);
      }
    }
  }, []);

  const handleRegisterUser = async () => {
    if (
      !name ||
      !lastName ||
      !birthDay ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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
          .then(() => {
            history.push('/login');
          });
      } catch (error) {
        toast.error(
          'Houve um problema com seu cadastro. Verifique novamente seus dados'
        );
      }
    }
  };

  const handleUpdateUser = async () => {
    if (!name || !lastName || !email) {
      toast.error(
        'Informe todos os seus dados corretamente para realizar a edição das informações de cadastro'
      );
      return;
    }
    try {
      await api.put('/users/auth/update', {
        name,
        lastName,
        email,
        birthDay,
      });
      toast.success('Alterações realizadas com sucesso.');
      window.location.replace('/');
    } catch (error) {
      toast.error(
        `Houve um problema com a edição das informações de cadastro: ${error}`
      );
    }
  };

  const handleSubmit = () => {
    if (id) {
      handleUpdateUser();
    } else {
      handleRegisterUser();
    }
  };

  return (
    <Container>
      <Register>
        <Form className='w-75'>
          <Title>{id ? 'Edição de usuário ' : 'Cadastro do usuário'}</Title>
          <FormGroup>
            <Label>Nome</Label>
            <Input
              type='text'
              id='inputName'
              value={name}
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
              value={lastName}
              onChange={(lastnameValue) => {
                setLastName(lastnameValue.target.value);
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
              value={email}
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
            <StyledButton onClick={handleSubmit} outline className='w-10'>
              {id ? 'Concluir' : 'Cadastrar'}
            </StyledButton>
          </FormButton>
        </Form>
        {!id && (
          <Link to='/RegisterBusiness'>
            <StyledButton type='submit' outline className='w-10'>
              Cadastrar Empresa
            </StyledButton>
          </Link>
        )}
      </Register>
    </Container>
  );
};

export default RegisterUser;
