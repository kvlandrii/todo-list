import React, { Component } from "react";

export class Class extends Component {
  state = {
    todos: [],
    input: "",
    timer: 0,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer + 1 }));
    }, [1000]);

    const lsTodos = localStorage.getItem("todos");

    if (lsTodos) {
      this.setState({ todos: JSON.parse(lsTodos) });
    }
    console.log("componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      console.log("componentDidUpdate");
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
  }

  addTask = () => {
    this.setState({ todos: [...this.state.todos, this.state.input] });
    this.setState({ input: "" });
  };

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({ input: value });
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  clearLocalStorage = () => {
    localStorage.removeItem("todos");
  };

  render() {
    return (
      <>
        <h2>{this.state.timer}</h2>
        <input value={this.state.input} onChange={this.onChangeHandler} />
        <button onClick={this.addTask}>Add Todo</button>
        {this.state.todos.map((todo) => (
          <p key={todo.id}>{todo}</p>
        ))}
        <button onClick={this.clearLocalStorage}>Clear Local Storage</button>
      </>
    );
  }
}

export default Class;
