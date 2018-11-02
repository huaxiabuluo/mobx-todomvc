import React from 'react';
import { observer, inject } from 'mobx-react';
import TodoTextInput from '@view/components/todo-text-input';

@inject('todoIns')
@observer
export default class Header extends React.Component {
    onSave = text => text.length !== 0 && this.props.todoIns.addTodo({ text })

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    newTodo
                    onSave={this.onSave}
                    placeholder="What needs to be done?"
                />
            </header>
        );
    }
};
