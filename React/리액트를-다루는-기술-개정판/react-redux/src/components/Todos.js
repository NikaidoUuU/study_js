import React, { memo } from 'react';

const TodoItem = memo(({ todo, onToggle, onRemove }) => {
  console.log(todo);
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button type="button" onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
});

const Todos = memo(({
  input,
  todos,
  onChangeInput,
  onCreate,
  onToggle,
  onRemove,
}) => {
  const handleCreate = e => {
    e.preventDefault();
    onCreate(input);
    onChangeInput('');
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input value={input} onChange={e => onChangeInput(e.target.value)} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
});

export default Todos;
