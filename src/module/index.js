import { observable, computed, configure, action } from "mobx";
// import remotedev from 'mobx-remotedev-v4';

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });

class Todo {
    constructor(props) {
        this.text = props?.text || '空的';
        this.finished = false;
        this.id = Math.random().toString(36).slice(-8);
    }

    @action
    updateTodoText = text => this.text = text;

    @action
    switchFinished = finished => this.finished = finished;

    @observable
    text

    @observable
    finished
}

// @remotedev({ name: 'todolist' })
export class TodoList {

    @observable 
    todos = Array.from({ length: 3 }).map((v, i) => new Todo({ text: `第${i}条内容` }));

    @observable
    todoFilter = 'All'

    // 切换过滤器
    @action
    setFilter = type => this.todoFilter = type;

    // 增加单项
    @action
    addTodo = ({ text }) => this.todos.push(new Todo({ text }));

    // 删除单项
    @action
    deleteTodo = todoId => this.todos.remove(this.todos.find(todo => todo.id === todoId));

    // 清理已经完成的
    @action
    clearCompleted = () => this.todos = this.todos.filter(todo => !todo.finished);

    // 清理所有
    @action
    clearAllTodos = () => this.todos.clear();

    // 完成 or 取消所有
    finishAllTodos = finished => this.todos.forEach(todo => todo.switchFinished(finished));

    @computed 
    get activeTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }

    @computed
    get filteredTodos() {
        switch(this.todoFilter) {
            case 'Active'    : return this.todos.filter(todo => !todo.finished);
            case 'Completed' : return this.todos.filter(todo => todo.finished);
            case 'All' :
            default    : return this.todos; 
        }
    }

    @computed
    get todosCount() {
        return this.todos.length;
    }
}
