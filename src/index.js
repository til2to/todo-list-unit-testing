import './style.css';
import addTodo from './modules/addTodo.js';
import removeTodo from './modules/removeTodo.js';
import { displayAllTasks, taskDescriptionView } from './modules/drawTask.js';
import {
  updateTask,
  completeTask,
  clearCompleted,
} from './modules/updateTask.js';

const getTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
export default getTasks;

const todoContainer = document.getElementById('todoContainer');
const descriptionContainer = document.querySelector('.description-list');
const form = document.querySelector('.form');
const clearTask = document.querySelector('.button-for-reset');

// function to display UI
displayAllTasks(getTasks, todoContainer);
taskDescriptionView(descriptionContainer);

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

// addTodo
const sendTask = document.querySelector('#sendTask');
let currentValue = '';
let exist = false;

// function to compare before adding task
const compareTasks = (getTasks, currentTask) => {
  getTasks.forEach(
    (task) => JSON.stringify(task.decription) === JSON.stringify(currentTask),
  );
};

const taskElement = document.querySelector('#description');
taskElement.addEventListener('change', (e) => {
  taskElement.textContent = e.target.value;
  currentValue = e.target.value;
});

sendTask.addEventListener('click', () => {
  /* eslint-disable */
  const clearInput = () => (currentValue = "");
  if (compareTasks(getTasks, currentValue)) {
    exist = true;
  }

  if (exist === false && currentValue.length !== 0) {
    let newStorage = JSON.parse(window.localStorage.getItem("tasks")) || [];
    addTodo(currentValue, newStorage);
    clearInput();
    displayAllTasks(newStorage, todoContainer);
  }
});

const inputValue = document.getElementById("description");
inputValue.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputValue.value.length !== 0) {
    event.preventDefault();
    const newTask = { description: inputValue.value, completed: false };
    let tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];

    // Check if task already exists in local storage
    const existingTask = tasks.find(
      (task) => task.description === newTask.description
    );
    console.log(newTask)
    if (existingTask) {
      console.warn("Task already exists:", existingTask);
      inputValue.value = "";
      return;
    }
    else{
      addTodo(inputValue.value, tasks);
      displayAllTasks(tasks, todoContainer);
      inputValue.value = " ";
    }
  }
});

// remove task
todoContainer.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (li) {
    const index = li.id;
    const intIndex = parseInt(index);
    const deleteButton = document.getElementById(`delete${index}`);
    const ellipsisButton = document.getElementById(`move${index}`);
    deleteButton.hidden = !deleteButton.hidden;
    ellipsisButton.hidden = !ellipsisButton.hidden;
    if (deleteButton.contains(event.target)) {
      let newStorage = JSON.parse(window.localStorage.getItem("tasks")) || [];
      removeTodo(newStorage, intIndex);
      // Remove the li element from the DOM
      li.remove();
    }
  }

  // Hide other trash icons
  const allLiElements = Array.from(todoContainer.querySelectorAll("li"));
  allLiElements.forEach((liElement) => {
    const deleteButtonElement = liElement.querySelector(".deleteButton");
    const ellipsisButtonElement = liElement.querySelector(".ellipsis");
    if (liElement !== li) {
      deleteButtonElement.hidden = true;
      ellipsisButtonElement.hidden = false;
    }
  });
});


todoContainer.addEventListener("change", (event) => {
  const li = event.target.closest("li");
  if (li) {
    const index = li.id;
    const intIndex = parseInt(index);
    const taskListItem = document.getElementById(`edit${index}`);
    console.log(taskListItem);

    if (event.target.checked) {
      completeTask(intIndex, event.target.checked);
      const taskDescription = taskListItem.innerText.strike();
      updateTask(intIndex, taskDescription);
      let tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
      displayAllTasks(tasks, todoContainer);
    }
    if (event.target.checked === false) {
      completeTask(intIndex, event.target.checked);
      const taskDescription = taskListItem.innerText.replace("<strike>", "");
      updateTask(intIndex, taskDescription);
      let tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
      displayAllTasks(tasks, todoContainer);
    }
  }
});

// wrap the event handler in a function
export const handleInputEvent = (event) => {
  const li = event.target.closest("li");
  if (li) {
    const index = li.id;
    const intIndex = parseInt(index);
    const taskListItem = document.getElementById(`edit${index}`);
    const updateValue = taskListItem.textContent.trim();
    updateTask(intIndex, updateValue);
  }
}

// And then add it as the event listener in the main code like this:
todoContainer.addEventListener("input", handleInputEvent);

// clear all completed tasks
clearCompleted(getTasks)

clearTask.addEventListener("click", () => {
  clearCompleted();
});
