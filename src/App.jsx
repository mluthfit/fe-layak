import React from 'react';
import { ReactComponent as Logo } from './assets/icons/square.svg';

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <Logo className="fill-green-500" />
    </h1>
  );
}

export default App;
