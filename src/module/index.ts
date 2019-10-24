import { observable, computed, configure, action } from "mobx";

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });

export enum FilterEnum {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  All = 'all'
}

export class Todo {
  id: string

  constructor(props: any) {
    this.text = props.text || '空的';
    this.finished = false;
    this.id = Math.random().toString(36).slice(-8);
  }

  @action
  updateTodoText = (text: string) => this.text = text

  @action
  switchFinished = (finished: boolean) => {
    console.log('#####switchFinished', finished);
    this.finished = finished;
  }

  @observable
  text: string

  @observable
  finished: boolean
}

export class TodoList {

  todos = observable.array(
    Array.from({ length: 3 }).map((v, i) => new Todo({ text: `第${i}条内容` }))
  )

  @observable
  todoFilter: FilterEnum = FilterEnum.All

  // 切换过滤器
  @action
  setFilter = (type: FilterEnum) => this.todoFilter = type

  // 增加单项
  @action
  addTodo = ({ text }: { text: string }) => this.todos.push(new Todo({ text }))

  // 删除单项
  @action
  deleteTodo = (todoId: string) => this.todos.remove(this.todos.find(todo => todo.id === todoId))

  // 清理已经完成的
  @action
  clearCompleted = () => this.todos.replace(this.todos.filter(todo => !todo.finished))

  // 清理所有
  @action
  clearAllTodos = () => this.todos.clear()

  // 完成 or 取消所有
  finishAllTodos = (finished: boolean) => this.todos.forEach(todo => todo.switchFinished(finished));

  @computed
  get activeTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @computed
  get filteredTodos() {
    switch (this.todoFilter) {
      case FilterEnum.ACTIVE:
        return this.todos.filter(todo => !todo.finished);
      case FilterEnum.COMPLETED:
        return this.todos.filter(todo => todo.finished);
      case FilterEnum.All:
      default:
        return this.todos;
    }
  }

  @computed
  get todosCount() {
    return this.todos.length;
  }
}
