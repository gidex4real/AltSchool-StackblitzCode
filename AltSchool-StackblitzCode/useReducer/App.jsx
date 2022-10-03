import { useReducer } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function countReducer(initialState = 0, action) {
  switch (action) {
    case 'increment':
      return initialState + 1;
    case 'decrement':
      return initialState - 1;
    case 'reset':
      return initialState;
    default:
      return initialState;
  }
}

function App() {
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <span style={{ fontSize: '11rem' }}>{count}</span>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch('increment')}>increment</button>
        <button onClick={() => dispatch('decrement')}>decrement</button>
      </div>
    </div>
  );
}

export default App;
