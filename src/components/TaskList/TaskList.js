import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default class TaskList extends Component {
  static defaultProps = {
    task: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
  };
  static propTypes = {
    task: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
  };

  render() {
    const { task, onDeleted, onToggleCompleted } = this.props;
    const el = task.map((item) => {
      const { id } = item;
      return (
        <Task
          key={id}
          {...item}
          getDate={item.timer}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
      );
    });

    return <ul className="todo-list">{el}</ul>;
  }
}
