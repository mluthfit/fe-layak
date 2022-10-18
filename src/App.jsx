import React from 'react';
import { ReactComponent as Atom } from './assets/icons/atom.svg';

function App() {
  return (
    <h1 className="text-3xl font-bold underline bg-tahiti-200">
      Hello world!
      <Atom className="w-8 h-8 fill-primary-400" />
    </h1>
  );
}

export default App;
