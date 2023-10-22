const URL_TODO = 'https://jsonplaceholder.typicode.com/todos';
const URL_USER = 'https://jsonplaceholder.typicode.com/users';

const select = document.querySelector('#user-todo');
const list = document.querySelector('#todo-list');
const form = document.querySelector('form');

async function getTodos() {
  try {
    if (!navigator.onLine) {
      throw new Error('Отсутствует интернет-соединение');
    }
    const response = await fetch(URL_TODO);
    if (!response.ok) {
      throw new Error(`Код ошибки ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    if (!navigator.onLine) {
      throw new Error('Отсутствует интернет-соединение');
    }
    const response = await fetch(URL_USER);
    if (!response.ok) {
      throw new Error(`Код ошибки ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getData() {
  try {
    return await Promise.all([getTodos(), getUsers()]);
  } catch (error) {
    throw error;
  }
}

async function postTask(task) {
  try {
    if (!navigator.onLine) {
      throw new Error('Отсутствует интернет-соединение');
    }
    const response = await fetch(URL_TODO, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`Код ошибки ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function updateTask(idTask, isCompleted) {
  try {
    if (!navigator.onLine) {
      throw new Error('Отсутствует интернет-соединение');
    }
    const response = await fetch(`${URL_TODO}/${idTask}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        completed: isCompleted,
      })
    });
    if (!response.ok) {
      throw new Error(`Код ошибки ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function deleteTask(idTask) {
  try {
    if (!navigator.onLine) {
      throw new Error('Отсутствует интернет-соединение');
    }
    const response = await fetch(`${URL_TODO}/${idTask}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Код ошибки ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
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

getData()
.then(([dataTodos, dataUsers]) => {
  dataUsers && dataUsers.forEach((user) => createUser(user));
  dataTodos && dataTodos.forEach((task) => createTask(task));
})
.catch((error) => alert(error));

function handleChange(event) {
  const checked = event.target.checked;
  event.target.checked = !checked;
  updateTask(Number(event.target.parentElement.dataset.id), checked)
  .then((res) => {
    event.target.checked = res.completed;
    const textTask = event.target.parentElement.querySelector('p');
    if (res.completed) {
      textTask.classList.add('completed');
    } else {
      textTask.classList.remove('completed');
    }
  })
  .catch((error) => alert(error));
}

function handleDelete(event) {
  deleteTask(event.target.parentElement.dataset.id)
  .then(() => {
    list.removeChild(event.target.parentElement);
  })
  .catch((error) => alert(error));
}

function handleSubmit(event) {
  event.preventDefault();
  const userValue = Number(event.target.elements.user.value);
  const todoValue = event.target.elements.todo.value;
  if (!isNaN(userValue) && todoValue) {
    postTask({
      userId: userValue,
      title: todoValue,
      completed: false,
    })
    .then((res) => {
      createTask(res);
      form.reset();
    })
    .catch((error) => alert(error));
  } else {
    alert('Напишите задачу и выберите пользователя');
  }
}

form.addEventListener('submit', handleSubmit);
