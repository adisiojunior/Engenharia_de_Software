import React from 'react';
import './components/user/userRegistrationPage';

function App() {
  return (
    <main className='main'>
      <h1 className='title'>Cadastro do usuário</h1>
      <form className='form'>
        <div>
          <label htmlFor='name'>
            Nome
            <input type='text' id='name' name='name' />
          </label>
        </div>
        <div>
          <label htmlFor='last-name'>
            Sobrenome
            <input type='text' id='last-name' name='last-name' />
          </label>
        </div>
        <div>
          <label htmlFor='email'>
            E-mail
            <input type='text' id='email' name='email' />
          </label>
        </div>
        <div>
          <label htmlFor='password'>
            Senha
            <input type='password' id='password' name='password' />
          </label>
        </div>
        <div>
          <label htmlFor='confirm-password'>
            Confirme a sua senha
            <input
              type='password'
              id='confirm-password'
              name='confirm-password'
            />
          </label>
        </div>
      </form>
      <button type='submit'>Concluir</button>
      <button type='button'>Cadastrar Empresa</button>
    </main>
  );
}

export default App;
