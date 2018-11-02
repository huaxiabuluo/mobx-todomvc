import React from 'react';
import ToggleAll from './toggle-all';
import TodoList from './todo-list';

const MainSection = () => (
    <section className="main">
        <ToggleAll />
        <TodoList />
    </section>
);

export default MainSection;
