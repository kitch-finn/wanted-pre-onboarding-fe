import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main';
import Todo from './components/Todo/Todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
