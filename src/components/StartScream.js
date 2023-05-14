import React from 'react'
import "./StartScream.css";

const StartScream = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botão para começar o JOGO</p>
        <button onClick={startGame}>Start</button>
    </div>
  )
}

export default StartScream