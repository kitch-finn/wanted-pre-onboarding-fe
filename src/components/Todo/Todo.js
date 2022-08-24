import React, { useState, useEffect } from 'react';

import TodoList from './TodoList';
import styled from 'styled-components';
import axios from 'axios';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: center; // 좌우 가운데로 정렬
  justify-content: center;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 80);
  overflow: hidden;
  vertical-align: middle;
`;

export const BigInput = styled.input`
  width: 30vw;
  height: 5vh;
  font-size: 15px;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: lightgray;
  box-shadow: none;
  transition: 0.25s;
  border: 1px solid white;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
  &:hover {
    border: 1px solid gray;
  }
  &::placeholder {
    color: white;
  }
`;

export const TodoAddButton = styled.button`
  position: relative;
  border: none;
  padding: 17px;
  border-radius: 15px;
  margin-top: 1%;
  font-family: sans-serif;
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: gray;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

export const Line = styled.div`
  content: '';
  display: block;
  width: 60px;
  border-bottom: 1px solid #bcbcbc;
  margin: 20px 0px;
`;

export const TodoListContainer = styled.div`
  display: flex;
`;

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
      <MainContainer>
        <h1>Todo</h1>
        <h3>Add Todo</h3>
        <div>
          <BigInput
            onChange={handleInputValue}
            placeholder='추가할 할 일을 입력해주세요'
          />
          <TodoAddButton onClick={createTodo}>추가</TodoAddButton>
        </div>
        <Line />

        <h3>Todo List: {todos.length}</h3>

        <TodoListContainer>
          {todos.map((todo) => {
            return <TodoList todo={todo} key={todo.id} />;
          })}
        </TodoListContainer>
      </MainContainer>
    </>
  );
}

export default Todo;
