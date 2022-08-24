import React, { useState } from 'react';

import styled from 'styled-components';
import axios from 'axios';

export const ListContainer = styled.div`
  background-color: gainsboro;
  width: 20vw;
  border-radius: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0.5, 0.5);
`;

export const ListFlex = styled.div`
  display: flex;
`;

export const TodoBody = styled.div`
  font-size: 20px;
  margin: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CompletedBody = styled.div`
  text-decoration: line-through;
`;

export const Button = styled.button`
  position: relative;
  border: none;
  padding: 10px;
  border-radius: 15px;
  margin: 1%;
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

export const EditButton = styled(Button)`
  margin-left: 10%;
`;

export const DeleteButton = styled(Button)`
  background-color: gainsboro;
  border: 1px solid gray;
  color: black;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

export const Input = styled.input`
  margin-top: 3%;
  width: 80%;
  height: 5vh;
  font-size: 15px;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(253, 253, 253);
  border: 1px solid gainsboro;
  &:hover {
    border: 1px solid gray;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeTodo = () => {
    axios
      .put(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
        { todo: editTodoBody, isCompleted: true },
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
      <ListContainer>
        <TodoBody>
          {edit ? (
            <>
              <Input onChange={handleInputValue} placeholder={todoBody}></Input>
              <div>
                <EditButton onClick={updateTodo}>수정완료</EditButton>
                <DeleteButton onClick={() => setEdit(false)}>
                  수정 취소
                </DeleteButton>
              </div>
            </>
          ) : isCompleted ? (
            <CompletedBody>{todoBody}</CompletedBody>
          ) : (
            <div>{todoBody}</div>
          )}
          {edit ? null : isCompleted ? null : (
            <>
              <EditButton onClick={() => setEdit(true)}>수정</EditButton>
            </>
          )}
        </TodoBody>
        <ButtonDiv>
          {isCompleted ? null : <Button onClick={completeTodo}>완료</Button>}
          <DeleteButton onClick={deleteTodo}>삭제</DeleteButton>
        </ButtonDiv>
      </ListContainer>
    </>
  );
}

export default TodoList;
