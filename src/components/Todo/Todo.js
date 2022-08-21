import React, { useState, useEffect } from 'react';

import TodoList from './TodoList';
import styled from 'styled-components';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
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
        loadTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            type='submit'
            onChange={handleInputValue}
            placeholder='추가할 내용을 입력해주세요'
          />
          <button onClick={createTodo}>추가</button>
        </div>
        <div>
          {todos.map((todo) => {
            return <TodoList todo={todo} key={todo.id} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Todo;
