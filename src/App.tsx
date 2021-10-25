import { useEffect, useRef, useState } from 'react';

import { Cell } from './Cell';
import { calculateNextGeneration, generateRandomUniverse } from './utils';
import { DEFAULT_UNIVERSE_SIZE } from './constants';

const universe = generateRandomUniverse();

function App() {
  const [state, setState] = useState(universe);
  const requestID = useRef(0);

  const calculate = () => {
    const delay = 1000 / 60;
    const start = new Date().getTime();
    setState(prevState => calculateNextGeneration(prevState))

    let end = new Date().getTime();
    let delta = end - start;
    while (delta < delay) {
      end = new Date().getTime();
      delta = end - start;
    }
    requestID.current = requestAnimationFrame(calculate)
  }

  useEffect(() => {
    calculate()
    return () => cancelAnimationFrame(requestID.current);
  }, []);

  return (
    <div style={{ display: 'grid',  gridTemplateColumns: `repeat(${DEFAULT_UNIVERSE_SIZE}, 1fr)`, height: '100%', width: '100%' }}>
      {state.map(row => 
        row.map((cell, index) => <Cell key={index} value={cell} />)
      )}
    </div>
  );
}

export default App;
