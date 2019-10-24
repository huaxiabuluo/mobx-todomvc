import React, { useContext, useCallback } from 'react';
import { observer, MobXProviderContext } from 'mobx-react'
import { TodoList } from '#/module';
import TodoTextInput from '#/view/components/todo-text-input';
// import { useInject } from '#/lib/js/utils';

// export default observer(function Header() {
//   // const { addTodo } = useInject(stores => ({
//   //   addTodo: (stores.todoIns as TodoList).addTodo,
//   // }));
//   // const onSave = useCallback((text: string) => {
//   //   text.length !== 0 && addTodo({ text });
//   // }, [addTodo]);

//   const { todoIns } = useContext(MobXProviderContext) as { todoIns: TodoList };
//   const onSave = useCallback((text: string) => {
//     text.length !== 0 && todoIns.addTodo({ text });
//   }, [todoIns]);

//   return (
//     <header className="header">
//       <h1>todos</h1>
//       <TodoTextInput
//         newTodo
//         onSave={onSave}
//         placeholder="What needs to be done?"
//       />
//     </header>
//   );
// })

export default observer(function Header() {
  // const { addTodo } = useInject(stores => ({
  //   addTodo: (stores.todoIns as TodoList).addTodo,
  // }));
  // const onSave = useCallback((text: string) => {
  //   text.length !== 0 && addTodo({ text });
  // }, [addTodo]);

  const { todoIns } = useContext(MobXProviderContext) as { todoIns: TodoList };
  const onSave = useCallback((text: string) => {
    text.length !== 0 && todoIns.addTodo({ text });
  }, [todoIns]);

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={onSave}
        placeholder="What needs to be done?"
      />
    </header>
  );
})
