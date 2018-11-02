import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('todoIns')
@observer
export default class ComplateArea extends React.Component {
    render() {
        const { activeTodoCount, finishAllTodos, todosCount } = this.props.todoIns;
        const completedCount = todosCount - activeTodoCount;
        const allFinished = !activeTodoCount;

        if (!todosCount) { return null; }

        return (
            <span>
                <input
                    className="toggle-all"
                    type="checkbox"
                    onChange={() => {}}
                    checked={allFinished}
                />
                <label onClick={() => finishAllTodos(!allFinished)} />
            </span>
        );
    }
};
