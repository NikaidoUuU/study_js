import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from 'react-icons/md';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  &:nth-child(even) {
    background: ${palette.gray[0]};
  }
  & + & {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

const CheckBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
  }
  ${props =>
    props.checked &&
    css`
      svg {
        color: ${palette.cyan[5]};
      }
      p {
        color: ${palette.gray[5]};
        text-decoration: line-through;
      }
    `}
`;

const Text = styled.p`
  flex: 1;
  margin-left: 0.5rem;
`;

const RemoveContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.red[1]};
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: ${palette.red[0]};
  }
`;

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <Container>
      <CheckBox checked={checked} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <Text>{text}</Text>
      </CheckBox>
      <RemoveContainer onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </RemoveContainer>
    </Container>
  );
};

export default memo(TodoListItem);
