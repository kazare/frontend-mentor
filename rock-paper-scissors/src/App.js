import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [score, setScore] = useState(0);

  const choices = ['rock', 'paper', 'scissors'];

  const computerChoose = () => {
    const index = Math.floor(Math.random() * 3);
    setComputerChoice(choices[index]);
  };

  const play = (e) => {
    setUserChoice(e.target.value);
    computerChoose();
    scoring();
  };

  const scoring = () => {

    if (
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setScore(score + 1);

    } else if (
      (userChoice === 'rock' && computerChoice === 'paper') ||
      (userChoice === 'scissors' && computerChoice === 'rock') ||
      (userChoice === 'paper' && computerChoice === 'scissors')
    ) {
      setScore(score);
    }
  };


  return (
    <div className="App">
      <h1>Hello world! 🌎</h1>
      <ul>
        <li>Paper beats Rock</li>
        <li>Rock beats Scissors</li>
        <li>Scissors beats Paper</li>
      </ul>

      <main>
        <div>Score: {score}</div>
        <div>User: {userChoice}</div>
        <div>Computer: {computerChoice}</div>
        <div>
          <button value='rock' onClick={play}>Rock</button>
          <button value='paper' onClick={play}>Paper</button>
          <button value='scissors' onClick={play}>Scissors</button>
        </div>
        <button>GO</button>
        <button >Play Again</button>
      </main>
    </div>
  );
}

export default App;
