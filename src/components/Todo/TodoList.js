import React, { useState } from 'react';

import axios from 'axios';

function TodoList({ todo }) {
  const { id, todo: todoBody, isCompleted } = todo;

  const [editTodoBody, setEditTodoBody] = useState(todoBody);
  const handleInputValue = (e) => {
    setEditTodoBody(e.target.value);
  };
  const [fin, setFin] = useState(isCompleted);
  const [edit, setEdit] = useState(false);

  const handleFinish = () => {
    setFin(!fin);
  };

  const updateTodo = () => {
    axios
      .put(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
        { todo: editTodoBody, isCompleted: fin },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = () => {
    axios
      .delete(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <li>{todoBody}</li>
        <button onClick={handleFinish}>완료</button>
        {edit ? (
          <>
            <input onChange={handleInputValue}></input>
            <button onClick={updateTodo}>수정완료</button>
          </>
        ) : null}
        <button onClick={() => setEdit(true)}>수정</button>
        <button onClick={deleteTodo}>삭제</button>
      </div>
    </>
  );
}

export default TodoList;
