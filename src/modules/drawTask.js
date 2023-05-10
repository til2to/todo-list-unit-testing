import sync from '../assets/icons/sync.png';
import downLeft from '../assets/icons/down_left.png';

const titleContainer = document.querySelector('.title-list');

// dynamically populate todo lists
const displayAllTasks = (getTasks, todoContainer) => {
  getTasks.sort((a, b) => a.index - b.index);
  let item = '';
  /* eslint-disable */
  getTasks.map((task) => item += `
    <li id='${task.index}' class="task">
      <input type="checkbox" name="check-task" id='check${task.index}' ${task.completed ? 'checked' : 'unchecked'}/>
      <span class="task-list-item" contenteditable="true" id='edit${task.index}'>
        ${task.description}
      </span>
      <button class='deleteButton'hidden id='delete${task.index}'>
        <i class="fa fa-trash-o" aria-hidden="true" id='deleteIcon${task.index}'></i>
      </button>
      <button class='ellipsis' id='move${task.index}'>
        <i class="fa fa-ellipsis-v" aria-hidden="true" id='moveIcon${task.index}'></i>
      </button>
    </li>
  `);
  todoContainer.innerHTML = item;
};

// the task description view of the html
const taskDescriptionView = (descriptionContainer) => {
  const descriptionHtml = `
  <li class="description-list-item first-child">
    <input
    type="text"
    name="task-description"
    id="description"
    placeholder="Add to your list..."
    />
  </li>
  <li class="description-list-item">
    <img class="staticIcon" id="sendTask" src=${downLeft} />
  </li>
  `;
  descriptionContainer.innerHTML = descriptionHtml;
};

// the title component of the view
const titleHtml = `
  <li class="title-list-item">
    <span>Today's To Do</span>
  </li>
  <li class="title-list-item">
    <img class="staticIcon" id="add-task" src=${sync} alt="">
  </li>
`;
titleContainer.innerHTML = titleHtml;

export { displayAllTasks, taskDescriptionView };