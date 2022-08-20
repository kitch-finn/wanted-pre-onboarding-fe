import React, { useState, useEffect } from 'react';

import TodoList from './TodoList';
import styled from 'styled-components';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState({
    id: '',
    todo: '',
    isCompleted: false,
    userId: '',
  });
  const [todoBody, setTodoBody] = useState('');

  const handleInputValue = (e) => {
    setTodoBody(e.target.value);
  };

  const loadTodos = () => {
    axios
      .get(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      )
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTodo = () => {
    axios
      .post(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
        { todo: todoBody },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  const updateTodo = () => {};
  const deleteTodo = () => {};

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div>
        <h1>Todo</h1>
        <div>
          <div>Add Todo</div>
          <input
            onChange={handleInputValue}
            placeholder='추가할 내용을 입력해주세요'
          />
          <button onClick={createTodo}>추가</button>
        </div>
        <TodoList todo={todos} />

        <div>Todo List</div>
        <div>
          <div>투두 내용</div>
        </div>
      </div>
    </>
  );
}

export default Todo;
