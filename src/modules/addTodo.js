// function to add list
const addTodo = (description, getTasks) => {
  const addTask = {};
  const lastIndex = getTasks.length;
  addTask.description = description;
  addTask.index = lastIndex + 1;
  addTask.completed = false;

  // Check for duplicate index
  const existingTask = getTasks.find((task) => task.index === addTask.index);
  if (existingTask) {
    throw new Error('Task index already taken');
  }

  getTasks.push(addTask);
  // sort task according to their index values
  getTasks.sort((a, b) => a.index - b.index);
  window.localStorage.setItem('tasks', JSON.stringify(getTasks));
};

// export function
export default addTodo;