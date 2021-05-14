import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import api from '../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Title, StyledButton, Register, FormButton } from './styles';

setDefaultLocale('pt');
const RegisterUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword] = useState('');

  useEffect(() => {
    if (id) {
      try {
        api.get('/users/auth/get').then((result) => {
          setName(result.data.user.name);
          setLastname(result.data.user.lastName);
          setSelectedDate(result.data.user.selectedDate);
          setEmail(result.data.user.email);
        });
      } catch (error) {
        toast.error(`Não foi possível encontrar usuário: ${error}`);
      }
    }
  }, []);

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

  const handleUpdateUser = async () => {
    if (!name || !lastname || !email) {
      toast.error(
        'Informe todos os seus dados corretamente para realizar a edição das informações de cadastro'
      );
      return;
    }
    try {
      api.put('/users/auth/update', {
        name,
        lastname,
        email,
        selectedDate,
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
        <Form onSubmit={handleSubmit} className='w-75'>
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
              value={lastname}
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
              value={email}
              onChange={(emailValue) => {
                setEmail(emailValue.target.value);
              }}
            />
          </FormGroup>
          {!id && (
            <>
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
            </>
          )}
          <FormButton>
            <StyledButton type='submit' outline className='w-10'>
              {id ? 'Editar' : 'Cadastrar'}
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
