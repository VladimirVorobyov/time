let moment = require('nanoid');
const taskTemplateElement = document.querySelector('#task-template').content;
const mainElement = document.querySelector('.main');
const newTaskElement = mainElement.querySelector('.new-task');
const addTaskButtonElement = mainElement.querySelector('.add-task-button');
const clearTaskButtonElement = mainElement.querySelector('.clear-task-button');
const tasksListElement = mainElement.querySelector('.tasks');

let tasks = [
  {
    id:moment.nanoid(),
    title: 'Вынести мусор',
    isDone: false,
  },
  {
    id: moment.nanoid(),
    title: 'Защитить интенсив на соточку',
    isDone: true,
  },
];

const addTask = (title) => tasks.push({
  id: moment.nanoid(),
    title,
    isDone: false,
})

const clearTasks = () => tasks = [];

const completeTask = (id) => {
  const elem = tasks.find((item)=> item.id === id);
  elem.isDone = !elem.isDone;
}

const render = () => {
  const newFragment = document.createDocumentFragment();
  tasksListElement.innerHTML = '';

  tasks.forEach(({id,title,isDone}) => {
      const newTask = taskTemplateElement.cloneNode(true);
      if(isDone){
        newTask.querySelector('li').classList.add('task--complete');
      }
    const labelElement = newTask.querySelector('label');
    labelElement.textContent = title;
    labelElement.htmlFor = id;

    const inputElement = newTask.querySelector('input');
    inputElement.id = id;
    inputElement.checked = isDone;   
    inputElement.addEventListener('change', ({target}) => {
      completeTask(target.id);
      render();
    });
    newFragment.appendChild(newTask);
  })
  tasksListElement.appendChild(newFragment);
}
const addTaskButtonHandler = () => {
  const {value: newTaskTitle} = newTaskElement;

  if (newTaskTitle.trim() === '') {
    return;
  }

  addTask(newTaskTitle);
  render();
  newTaskElement.value = '';
  newTaskElement.focus();
};

const clearTaskButtonHandler = () => {
  clearTasks();
  render();
};

addTaskButtonElement.addEventListener('click', addTaskButtonHandler);
clearTaskButtonElement.addEventListener('click', clearTaskButtonHandler);

 render();

