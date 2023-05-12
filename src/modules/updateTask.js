import { displayAllTasks } from './drawTask.js';

const todoContainer = document.getElementById('todoContainer');

// update task when it is edited
const updateTask = (id, description) => {
  const getTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
  getTasks.forEach((object) => {
    if (object.index === id) {
      object.description = description;
    }
  });
  window.localStorage.setItem('tasks', JSON.stringify(getTasks));
};

// change task's completed status
const completeTask = (index, checked) => {
  const tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];

  // Find task with specified index
  const taskToUpdate = tasks.find((task) => task.index === index);
  if (!taskToUpdate) {
    throw new Error(`Task with index ${index} not found`);
  }

  // Update task checkbox
  taskToUpdate.completed = checked;

  // Save updated tasks to local storage
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
};

const clearCompleted = (getTasks) => {
  const tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
  getTasks = tasks.filter((task) => !task.completed);
  let counter = 1;
  getTasks.forEach((task) => {
    task.index = counter;
    counter += 1;
  });
  window.localStorage.setItem('tasks', JSON.stringify(getTasks));
  displayAllTasks(getTasks, todoContainer);
};

export { updateTask, completeTask, clearCompleted };