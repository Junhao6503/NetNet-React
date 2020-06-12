import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {
    getSytle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }


    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={this.getSytle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} />
                    {title}
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnstyle}>x</button>
                </p>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnstyle = {
    background: '#ff0000',
    color: 'fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'

}
export default TodoItem

