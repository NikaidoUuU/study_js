import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { changeInput, create, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';

const TodosContainer = ({
  input,
  todos,
  onChangeInput,
  onCreate,
  onToggle,
  onRemove
}) => (
  <Todos
    input={input}
    todos={todos}
    onChangeInput={onChangeInput}
    onCreate={onCreate}
    onToggle={useCallback(id => onToggle(id), [onToggle])}
    onRemove={useCallback(id => onRemove(id), [onRemove])}
  />
);

export default connect(
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }),
  {
    onChangeInput: changeInput,
    onCreate: create,
    onToggle: toggle,
    onRemove: remove
  }
)(TodosContainer);
