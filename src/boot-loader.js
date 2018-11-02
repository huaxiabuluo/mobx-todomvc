import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'mobx-react';
import App          from './view';
import { TodoList } from '@module';

// import '@lib/style/reset.less';
import 'todomvc-app-css/index.css';

const todoIns = new TodoList();
ReactDOM.render(
	<Provider todoIns={todoIns}>
        <App />
    </Provider>, 
    document.getElementById('app')
);
