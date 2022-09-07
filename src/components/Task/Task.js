import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    getDate: new Date(),
  };
  static propTypes = {
    getDate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
  };
  tm = this.props.getDate;

  state = {
    completed: false,
    editing: false,
    time: formatDistanceToNow(this.tm, { includeSeconds: true }),
  };

  ClickOnEditing = () => {
    this.setState(() => {
      return {
        editing: true,
      };
    });
  };
  KeyPress = (e) => {
    if (e.code === 'Enter') {
      this.setState(() => {
        return {
          editing: false,
        };
      });
    }
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.date(), 500);
  }
  date = () => {
    this.setState({
      time: formatDistanceToNow(this.tm, { includeSeconds: true }),
    });
  };

  render() {
    let classNames = '';
    const { editing } = this.state;
    const { label, onDeleted, id, onToggleCompleted, completed } = this.props;

    if (completed) {
      classNames += ' completed';
    }

    if (editing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames} key={id}>
        <div className="view">
          <p>{}</p>
          <input className="toggle" type="checkbox" id={id} onClick={onToggleCompleted} checked={completed} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created {this.state.time} ago</span>
          </label>

          <button className="icon icon-edit" onClick={this.ClickOnEditing} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>

        <input type="text" className="edit" onKeyDown={this.KeyPress} />
      </li>
    );
  }
}
