import React, {useState} from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, undoTodo }) {
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      { todo.text }
      <div>
        { todo.isCompleted ? 
        <button className="undo-button" onClick={() => undoTodo(index)}>Undo</button>
        :
        <button className="complete-button" onClick={() => completeTodo(index)}>Complete</button>
      }
        <button className="remove-button" onClick={() => removeTodo(index)} >X</button>
      </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [ value, setValue ] = useState('');

  const handleSubmit= e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' className="input" value={value} onChange={e => setValue(e.target.value)}  placeholder="Add new todo here..." />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn React-Hooks',
      isCompleted: false
    },
    {
      text: 'Brunch with family',
      isCompleted: false
    },
    {
      text: 'Learn Data Science',
      isCompleted: false
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const undoTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <h1>React-Hooks Todo-list</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} undoTodo={undoTodo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App;