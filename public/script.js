const form = document.querySelector('form');
const submitBtn = document.querySelector('input[type="submit"]');
const todoList = document.querySelector('ul');
const todoInput = document.querySelector('input[type="text"]');

let myTodoList = [];

function formatNewTodo(content, isDone) {
  const res = document.createElement('li');
  res.classList.add('todo');
  if (isDone) res.classList.add('done');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');
  contentDiv.textContent = content;
  res.appendChild(contentDiv);

  const statusBtn = document.createElement('button');
  statusBtn.innerHTML = '&#10003;';
  statusBtn.classList.add('status');
  statusBtn.onclick = function () {
    const parentNode = this.parentElement;
    const idx = Array.prototype.indexOf.call(parentNode.parentElement.children, parentNode);
    if (parentNode.classList.contains('done')) {
      parentNode.classList.remove('done');
      myTodoList[idx].status = 'doing';
    } else {
      parentNode.classList.add('done');
      myTodoList[idx].status = 'done';
    }
    console.log(idx);
  };
  res.appendChild(statusBtn);

  const rmBtn = document.createElement('button');
  rmBtn.textContent = 'X';
  rmBtn.classList.add('remove');
  rmBtn.onclick = function() {
    const parentNode = this.parentElement;
    const idx = Array.prototype.indexOf.call(parentNode.parentElement.children, parentNode);
    myTodoList.splice(idx, 1);
    parentNode.remove();
  }
  res.appendChild(rmBtn);
  return res;
}

function addNewTodo(content, status = 'doing') {
  const newChild = formatNewTodo(content, status == 'done');
  todoList.append(newChild);
  myTodoList.push({
    'content': content,
    'status': status
  });
}

form.onsubmit = function(e) {
  e.preventDefault();
  addNewTodo(todoInput.value);
  todoInput.value = '';
}

const body = document.getElementsByTagName('body')[0];

body.onunload = function() {
  document.cookie = JSON.stringify(myTodoList);
}

body.onload = async function() {
  let data = await JSON.parse(document.cookie);
  await console.log(data);
  for (elem of data) {
    await addNewTodo(elem.content, elem.status);
  }
}
