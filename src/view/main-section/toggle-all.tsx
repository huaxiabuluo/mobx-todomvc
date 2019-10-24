import React from 'react';
import { observer, inject } from 'mobx-react';
import { TodoList } from '#/module';

@inject('todoIns')
@observer
export default class ComplateArea extends React.Component<any, any> {
  render() {
    const { activeTodoCount, finishAllTodos, todosCount } = this.props.todoIns as TodoList;
    const allFinished = !activeTodoCount;

    if (!todosCount) { return null; }

    return (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          onChange={() => { }}
          checked={allFinished}
        />
        <label onClick={() => finishAllTodos(!allFinished)} />
      </span>
    );
  }
};
