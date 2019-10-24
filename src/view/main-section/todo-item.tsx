import React from 'react';
import classnames from 'classnames';
import TodoTextInput from '#/view/components/todo-text-input';
import { TodoList, Todo } from '#/module';
import { observer } from 'mobx-react';

interface ITodoItem {
  todo?: Todo,
  deleteTodo?: TodoList['deleteTodo'],
}

@observer
export default class TodoItem extends React.Component<ITodoItem, any> {
  state = {
    editing: false
  }

  handleDoubleClick = () => this.setState({ editing: true })

  handleSave = ({ text, id }: { text: string, id: string }) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.todo.updateTodoText(text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, deleteTodo } = this.props;
    const { editing } = this.state;
    const liClassName = classnames({
      completed: todo.finished,
      editing: editing
    });

    const element = editing
      ?
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={(text: string) => this.handleSave({ text, id: todo.id })}
      />
      :
      <div className="view">
        <input className="toggle"
          type="checkbox"
          checked={todo.finished}
          onChange={() => todo.switchFinished(!todo.finished)}
        />
        <label onDoubleClick={this.handleDoubleClick}>
          {todo.text}
        </label>
        <button
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>;

    return <li className={liClassName}>{element}</li>;
  }
}
