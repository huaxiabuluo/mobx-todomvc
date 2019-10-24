import React from 'react';
import { observer, inject } from 'mobx-react';
import { TodoList } from '#/module';
import TodoItem from './todo-item';

@inject('todoIns')
@observer
export default class VTodoList extends React.Component<any, any> {
  render() {
    const { filteredTodos, deleteTodo } = this.props.todoIns as TodoList;
    return (
      <ul className="todo-list">
        {
          filteredTodos.map(todo => <TodoItem deleteTodo={deleteTodo} key={todo.id} todo={todo} />)
        }
      </ul>
    );
  }
};
