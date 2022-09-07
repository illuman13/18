import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './app.css';

export default class App extends Component {
  maxId = 100;

  // tm = new Date()
  // componentDidMount() {
  //   this.timerID = setInterval(
  //     () => this.date(),
  //     1000
  //   );
  // }
  // date = () => {
  //   this.setState({
  //     time: ''
  //   })
  // }

  state = {
    TaskDate: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'All',
  };

  clearTasks = () => {
    this.setState(({ TaskDate }) => {
      return {
        TaskDate: TaskDate.filter((item) => !item.completed),
      };
    });
  };

  filter = (tasks, filter) => {
    switch (filter) {
      case 'All': {
        return this.state.TaskDate;
      }
      case 'Completed': {
        return this.state.TaskDate.filter((item) => item.completed);
      }
      case 'Active': {
        return this.state.TaskDate.filter((item) => !item.completed);
      }
      default: {
        return this.state.TaskDate;
      }
    }
  };
  filterClicked = (e) => {
    this.setState({
      filter: e.target.textContent,
    });
  };

  createTodoItem(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      timer: new Date(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ TaskDate }) => {
      const idx = TaskDate.findIndex((el) => el.id === id);
      const newArray = [...TaskDate.slice(0, idx), ...TaskDate.slice(idx + 1)];
      return {
        TaskDate: newArray,
      };
    });
  };
  AddItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ TaskDate }) => {
      const newArray = [...TaskDate, newItem];
      return {
        TaskDate: newArray,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ TaskDate }) => {
      const newArray = TaskDate.map((item) => (item.id === id ? { ...item, completed: !item.completed } : { ...item }));
      return {
        TaskDate: newArray,
      };
    });
  };

  render() {
    const tasks = this.filter(this.state.TaskDate, this.state.filter);
    this.countLeft = tasks.filter((item) => !item.completed).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm AddItem={this.AddItem} />
        </header>
        <section className="main">
          <TaskList task={tasks} onDeleted={this.deleteItem} onToggleCompleted={this.onToggleCompleted} />
          <Footer
            filterCompleted={this.filterClicked}
            countLeft={this.countLeft}
            clearTasks={this.clearTasks}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
