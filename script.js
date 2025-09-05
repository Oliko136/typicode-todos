const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// GET Request
const getTodos = () => {
    fetch(apiUrl + '?_limit=5')
        .then(res => res.json())
        .then(data => {
            data.forEach(todo => addTodoToDOM(todo));
        })
}

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
    
    div.classList.add('todo');

    div.appendChild(document.createTextNode(todo.title));

    div.setAttribute('data-id', todo.id);

    if (todo.completed) {
        div.classList.add('done');
    }

    todoList.appendChild(div);
}

// POST Request
const createTodo = (e) => {
    e.preventDefault();

    const todoTitle = e.target.firstElementChild.value;

    const newTodo = {
        title: todoTitle,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => addTodoToDOM(data));

}

// PUT Request
const updateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
}

const toggleCompleted = (e) => {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');

        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    todoForm.addEventListener('submit', createTodo);
    todoList.addEventListener('click', toggleCompleted);
}

init();