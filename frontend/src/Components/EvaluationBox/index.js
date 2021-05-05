import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

const EvaluationBox = async () => {
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState('');

  function handleRate(e) {
    e.preventDefault();
  }
  return (
    <div>
      <section>
        <h1>Avaliações dos usuários</h1>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>``</th>
              <th>Usuário</th>
              <th>Opinião</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: 72 }}>
                <img src='' alt='avatar' />
              </td>
              <td>
                <h2>User123</h2>
              </td>
              <td>
                <h2>Muito Bom</h2>
              </td>
              <td>
                <h2>5</h2>
              </td>
            </tr>
            {/* {avaliacao.map((avaliacoes) => {
              return (
                <tr key={avaliacoes.user.id}>
                  <td style={{ width: 72 }}>
                    <img src={avaliacao.user.avatar} alt='avatar' />
                  </td>
                  <td>
                    <h2>{avaliacao.user.name}</h2>
                  </td>
                  <td>
                    <h2>{avaliacao.user.opiniao}</h2>
                  </td>
                  <td>
                    <h2>{avaliacao.user.nota}</h2>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </section>
      <section>
        <div>
          <Label for='inputDescription'>Comentário</Label>
          <Input
            type='text'
            id='inputDescription'
            onChange={(descriptionValue) => {
              setDescription(descriptionValue.target.value);
            }}
          />
          <Label for='inputStars'>Nota</Label>
          <Input
            type='number'
            id='inputStars'
            onChange={(starsValue) => {
              setStars(starsValue.target.value);
            }}
          />
          <button type='submit' onClick={handleRate}>
            Avaliar
          </button>
        </div>
      </section>
    </div>
  );
};

export default EvaluationBox;
