import { useState } from 'react';
import Advanced from './Advanced';
import Original from './Original';
import './App.css';
import './GameStart.css';
import './Buttons.css';



const App = () => {
  const [easyMode, setEasyMode] = useState(true);


  return (
    <div className="App">
      <button onClick={() => { setEasyMode(true) }}>Easy</button> <button onClick={() => { setEasyMode(false) }}>Advanced</button>

      {easyMode ? <Original /> : <Advanced />}
    </div>
  );
}

export default App;
