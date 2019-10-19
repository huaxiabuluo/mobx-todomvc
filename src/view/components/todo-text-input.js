import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';

export default function TodoTextInput(props) {
  const inputRef = useRef();

  const handleSubmit = useCallback(e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      props.onSave(text)
      if (props.newTodo) {
        inputRef.current.value = '';
      }
    }
  }, [inputRef, props]);

  const handleBlur = useCallback(e => !props.newTodo && props.onSave(e.target.value), [props]);

  const lastClass = classnames({
    edit: props.editing,
    'new-todo': props.newTodo
  });

  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue={props.text || ''}
      className={lastClass}
      placeholder={props.placeholder}
      autoFocus={true}
      onBlur={handleBlur}
      onKeyDown={handleSubmit}
    />
  );
}

// export default class TodoTextInput extends React.Component {
//     state = {
//         text: this.props.text || ''
//     }

//     handleSubmit = e => {
//         const text = e.target.value.trim()
//         if (e.which === 13) {
//             this.props.onSave(text)
//             if (this.props.newTodo) {
//                 this.setState({ text: '' })
//             }
//         }
//     }

//     handleChange = e => {
//         this.setState({ text: e.target.value })
//     }

//     handleBlur = e => {
//         if (!this.props.newTodo) {
//             this.props.onSave(e.target.value)
//         }
//     }

//     render() {
//         const lastClass = classnames({
//             edit: this.props.editing,
//             'new-todo': this.props.newTodo
//         });
//         return (
//             <input 
//                 className={lastClass}
//                 type="text"
//                 placeholder={this.props.placeholder}
//                 autoFocus={true}
//                 value={this.state.text}
//                 onBlur={this.handleBlur}
//                 onChange={this.handleChange}
//                 onKeyDown={this.handleSubmit} 
//             />
//         );
//     }
// }