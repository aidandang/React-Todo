import React from 'react';
import uuid from 'react-uuid';
import './App.css';

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: []
    }
  }

  onChangeInput = e => {
    e.preventDefault();
    const task = e.target.value;
    this.setState({todo: task});
  }

  formSubmit = e => {
    e.preventDefault();
    const newTodo = [...this.state.todos, {id: uuid(), content: this.state.todo, completed: false}]
    this.setState({todos: newTodo});
    this.setState({todo: ''})
  }

  onClickTodo = e => {
    e.persist();
    this.state.todos.forEach((todo, index) => 
      e.target.id === todo.id && this.setState(prevState => { 
        prevState.todos[index].completed = !prevState.todos[index].completed; return prevState 
      }));
  }

  onClickClearCompleted = e => {
    e.preventDefault();
    this.setState({todos: this.state.todos.filter(todo => todo.completed === false)});
  }

  
  render() {
    console.log(this.state.todos);
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col">
            <h2>Todo List</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                Todo List
              </div>
              <ul className="list-group list-group-flush">
                {this.state.todos.length > 0 && this.state.todos.map(todo => 
                  <li
                    onClick={this.onClickTodo} 
                    key={todo.id} 
                    id={todo.id} 
                    className={todo.completed ? 'list-group-item completed' : 'list-group-item'}
                  >
                    {todo.content}
                  </li>
                )}
              </ul>
              <div className="card-body">
                <form onSubmit={this.formSubmit}>
                  <div className="form-group mb-5 mt-4">
                    <input type="text" onChange={this.onChangeInput} className="form-control" id="todo" placeholder="Input here..." value={this.state.todo} />
                  </div>
                  <button type="submit" className="btn btn-primary mr-4">Add Todo</button><button type="submit" onClick={this.onClickClearCompleted} className="btn btn-primary">Clear Completed</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
