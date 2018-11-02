import React from 'react';
import { observer, inject } from 'mobx-react';
import TodoItem from './todo-item';

@inject('todoIns')
@observer
export default class TodoList extends React.Component {
    render() {
        const { filteredTodos, deleteTodo } = this.props.todoIns;
        return (
            <ul className="todo-list">
            {
                filteredTodos.map(todo => <TodoItem deleteTodo={deleteTodo} key={todo.id} todo={todo} />)
            }
            </ul>
        );
    }
};
