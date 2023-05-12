const titleContainer = document.querySelector('.title-list');

const displayAllTasks = (tasks, todoContainer) => {
  if (!todoContainer) {
    return;
  }

  tasks.sort((a, b) => a.index - b.index);
  const taskHtml = tasks.map((task) => `
    <li id="${task.index}" class="task">
      <input type="checkbox" name="check-task" id="check${task.index}" ${task.completed ? 'checked' : ''}/>
      <span class="task-list-item" contenteditable="true" id="edit${task.index}">
        ${task.description}
      </span>
      <button class="deleteButton" hidden id="delete${task.index}">
        <i class="fa fa-trash-o" aria-hidden="true" id="deleteIcon${task.index}"></i>
      </button>
      <button class="ellipsis" id="move${task.index}">
        <i class="fa fa-ellipsis-v" aria-hidden="true" id="moveIcon${task.index}"></i>
      </button>
    </li>
  `).join('');

  todoContainer.innerHTML = taskHtml;
};

const taskDescriptionView = (descriptionContainer) => {
  const descriptionHtml = `
    <li class="description-list-item first-child">
      <input type="text" name="task-description" id="description" placeholder="Add to your list...">
    </li>
    <li class="description-list-item">
      <img class="staticIcon" id="sendTask" src=${downLeftIcon}>
    </li>
  `;
  descriptionContainer.innerHTML = descriptionHtml;
};

const titleHtml = `
  <li class="title-list-item">
    <span>Today's To Do</span>
  </li>
  <li class="title-list-item">
    <img class="staticIcon" id="add-task" src='../assets/icons/sync.png' alt="">
  </li>
`;

titleContainer && (titleContainer.innerHTML = titleHtml);

export { displayAllTasks, taskDescriptionView };
