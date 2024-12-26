import React, { useReducer, useState } from 'react';



// function todoReducer(state, action) {
//   switch (action.type) {
//     case 'add':
//       return [...state, { id: Date.now(), text: action.payload, completed: false }];
//     case 'toggle':
//       return state.map(todo =>
//         todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
//       );
//     case 'delete':
//       return state.filter(todo => todo.id !== action.payload);
//     default:
//       throw new Error('Unknown action type');
//   }
// }

 function todoReducer(state,action){

    switch(action.type){
        case 'add':
            return [...state,{id:Date.now(),text:action.payload,completed:false}]

        case 'delete':
            return state.filter((todo)=>{
                return todo.id != action.payload
            })
        case 'toggle':
            return state.map((todo)=>{
              return (todo.id == action.payload? {...todo, completed : !todo.completed} : todo)
            })
        default:
            throw new Error('Unknown action type')
    }

}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    dispatch({ type: 'add', payload: input });
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add To-Do</button>
      <ul>
        {state.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;