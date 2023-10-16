const URL_TODO = 'https://jsonplaceholder.typicode.com/todos';
const URL_USER = 'https://jsonplaceholder.typicode.com/users';

const select = document.querySelector('#user-todo');
const list = document.querySelector('#todo-list');
const form = document.querySelector('form');

// "userId": 7,
// "title": "qui sit non",
// "completed": false

async function getTodos() {
  try {
    const response = await fetch(URL_TODO);
    return response.json();
  } catch (error) {
    throw new Error(alert("Ошибка: " + error));
  }
}

async function getUsers() {
  try {
    const response = await fetch(URL_USER);
    return response.json();
  } catch (error) {
    throw new Error(alert("Ошибка: " + error));
  }
}

async function getData() {
  try {
    return await Promise.all([getTodos(), getUsers()]);
  } catch (error) {
    throw new Error(alert("Ошибка: " + error));
  }
}

async function postTask(task) {
  try {
    const response = await fetch(URL_TODO, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  } catch (error) {
    throw new Error(alert("Ошибка: " + error));
  }
}

async function updateTask(idTask, IsCompleted) {
  try {
    const response = await fetch(`${URL_TODO}/${idTask}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        completed: IsCompleted,
      })
    });
    return response.json();
  } catch (error) {
    throw new Error(alert("Ошибка: " + error));
  }
}

async function deleteTask(idTask) {
  try {
    const response = await fetch(`${URL_TODO}/${idTask}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    throw new Error(alert("Ошибка: " + error));
  }
}

function createUser(user) {
  const option = document.createElement('option');
  option.value = user.id;
  option.textContent = user.name;
  select.append(option);
}

function createTask(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('input', handleChange);
  li.append(checkbox);

  const textTask = document.createElement('p');
  textTask.textContent = task.title;
  task.completed && textTask.classList.add('completed');
  li.append(textTask);

  const buttonDelete = document.createElement('button');
  buttonDelete.textContent = '╳';
  buttonDelete.classList.add('button-delete');
  buttonDelete.addEventListener('click', handleDelete);
  li.append(buttonDelete);

  list.prepend(li);
}

getData().then(([dataTodos, dataUsers]) => {
  dataUsers && dataUsers.forEach((user) => createUser(user));
  dataTodos && dataTodos.forEach((task) => createTask(task));
}).catch((error) => alert("Ошибка: " + error));

function handleChange(event) {
  const checked = event.target.checked;
  event.target.checked = !checked;
  updateTask(Number(event.target.parentElement.dataset.id), checked).then((res) => {
    event.target.checked = res.completed;
    const textTask = event.target.parentElement.querySelector('p');
    if (res.completed) {
      textTask.classList.add('completed');
    } else {
      textTask.classList.remove('completed');
    }
  }).catch((error) => alert("Ошибка: " + error));
}

function handleDelete(event) {
  deleteTask(event.target.parentElement.dataset.id).then(() => {
    list.removeChild(event.target.parentElement);
  }).catch((error) => alert("Ошибка: " + error));
}

function handleSubmit(event) {
  event.preventDefault();
  postTask({
    userId: Number(event.target.elements.user.value),
    title: event.target.elements.todo.value,
    completed: false,
  }).then((res) => {
    createTask(res);
    form.reset();
  }).catch((error) => alert("Ошибка: " + error));
}

form.addEventListener('submit', handleSubmit);
