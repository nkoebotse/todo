import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [editId, setEditId] = useState(null);
    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        try {
            await axios.post('http://localhost:3001/todos', { description, priority });
            setDescription('');
            setPriority('Medium');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id) => {
        try {
            await axios.put(`http://localhost:3001/todos/${id}`, { description: editDescription, priority: editPriority });
            setEditId(null);
            setEditDescription('');
            setEditPriority('');
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEditClick = (todo) => {
        setEditId(todo.id);
        setEditDescription(todo.description);
        setEditPriority(todo.priority);
    };

    const priorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'yellow';
            case 'Low':
                return 'green';
            default:
                return 'white';
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ backgroundColor: priorityColor(todo.priority) }}>
                        {editId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                                <select
                                    value={editPriority}
                                    onChange={(e) => setEditPriority(e.target.value)}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                <button onClick={() => updateTodo(todo.id)}>Update</button>
                                <button onClick={() => setEditId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo.description} - {todo.priority}
                                <button onClick={() => handleEditClick(todo)}>Edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Add To-Do</h2>
            <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button onClick={addTodo}>Add</button>
        </div>
    );
};

export default TodoList;
