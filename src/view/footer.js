import React from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';

const FilterTypeList = ['All', 'Active', 'Completed'];

@inject('todoIns')
@observer
export default class Footer extends React.Component {
    render() {
        const { 
            clearCompleted, setFilter, todoFilter,
            activeTodoCount, todosCount,
        } = this.props.todoIns;
        const completedCount = todosCount - activeTodoCount;
        const itemWord = activeTodoCount === 1 ? 'item' : 'items';

        if (!todosCount) { return null; }

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{activeTodoCount || 'No'}</strong> {itemWord} left
                </span>
                <ul className="filters">
                {
                    FilterTypeList.map(filter =>
                        <li key={filter}>
                            <a
                                className={classnames({ selected: filter === todoFilter })}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setFilter(filter)}
                            >
                                {filter}
                            </a>
                        </li>
                    )
                }
                </ul>
                {
                    !!completedCount
                    ?
                    <button
                      className="clear-completed"
                      onClick={clearCompleted}
                    >
                        Clear completed
                    </button> 
                    :
                    null
                }
            </footer>
        )
    }
};
