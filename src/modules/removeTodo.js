// remove task and update the indexes of the remaing tasks
const removeTodo = (getTasks, index) => {
  // newGetTasks;
  const newGetTasks = getTasks.filter((task) => task.index !== index);
  window.localStorage.setItem('tasks', JSON.stringify([...newGetTasks]));
  let counter = 1;
  newGetTasks.forEach((element) => {
    element.index = counter;
    window.localStorage.setItem('tasks', JSON.stringify(newGetTasks));
    counter += 1;
  });
};

export default removeTodo;