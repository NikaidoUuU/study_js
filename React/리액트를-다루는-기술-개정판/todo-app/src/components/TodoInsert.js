import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import { MdAdd } from 'react-icons/md';

const Form = styled.form`
  display: flex;
  background: ${palette.gray[7]};
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 1.125rem;
  line-height: 1.5;
  &::placeholder {
    color: ${palette.gray[3]};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background: ${palette.gray[6]};
  color: white;
  padding: 0 0.8rem;
  font-size: 1.5rem;
  transition: 0.1s background ease-in;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[5]};
  }
`;

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      onInsert(value);
      setValue('');
    },
    [onInsert, value]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <Button type="submit">
        <MdAdd />
      </Button>
    </Form>
  );
};

export default TodoInsert;
