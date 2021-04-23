import React from 'react';
import './userRegistrationPage.css';

export const userRegistrationPage = () => {
  return (
    <main className='main'>
      <h1 className='title'>Cadastro do usuário</h1>
      <form className='form'>
        <label htmlFor='name'>
          Nome
          <input type='text' id='name' name='name' />
        </label>
        <label htmlFor='last-name'>
          Sobrenome
          <input type='text' id='last-name' name='last-name' />
        </label>
        <label htmlFor='email'>
          E-mail
          <input type='text' id='email' name='email' />
        </label>
        <label htmlFor='password'>
          Senha
          <input type='password' id='password' name='password' />
        </label>
        <label htmlFor='confirm-password'>
          Confirme a sua senha
          <input
            type='password'
            id='confirm-password'
            name='confirm-password'
          />
        </label>
      </form>
      <button type='submit'>Concluir</button>
      <button type='button'>Cadastrar Empresa</button>
    </main>
  );
};
