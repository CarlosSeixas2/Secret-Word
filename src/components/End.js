import React from 'react';
import './End.css';

const End = ({retry, score}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>A sua pontuação foi {score}</h2>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  )
}

export default End