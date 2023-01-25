// To be able to mark an item as done and to delete an item from the array, assign a unique id to the item and write a function that
// will pick the idea when it is called, locate the item with that id in the array and either delete it or mark it as done, depending 
// on what action the user is executing.

var todoItems = [];

function displayTodo(todo) {
  const list = document.querySelector('.todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return
  }

  const addItem = document.querySelector('.add-task');
  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo bi-trash"></button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
    addItem.setAttribute('class', 'empty');
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  displayTodo(todo);
}

function markComplete(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  displayTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  displayTodo(todo);
}

const add = document.querySelector('#addBtn');
add.addEventListener('click', event => {
  event.preventDefault();
  const input = document.querySelector('.input');

  const text = input.value;
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    markComplete(itemKey);
  }
  
  if (event.target.classList.contains('delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});