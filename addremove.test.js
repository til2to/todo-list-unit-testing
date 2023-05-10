/**
 * @jest-environment jsdom
 */
import addTodo from './src/modules/addTodo.js';
import removeTodo from './src/modules/removeTodo.js';

describe('addTodo function', () => {
  test('should add a new task to the list with a unique index', () => {
    // Arrange
    const newTask = 'Buy milk';
    const existingTasks = [
      { index: 1, description: 'Walk the dog', completed: false },
      { index: 2, description: 'Do laundry', completed: true },
    ];

    // Act
    addTodo(newTask, existingTasks);

    // Assert
    const expectedTasks = [
      { index: 1, description: 'Walk the dog', completed: false },
      { index: 2, description: 'Do laundry', completed: true },
      { index: 3, description: 'Buy milk', completed: false },
    ];
    const actualTasks = JSON.parse(window.localStorage.getItem('tasks'));
    expect(actualTasks).toEqual(expectedTasks);
  });
});

describe('removeTodo function', () => {
  beforeEach(() => {
    // Clear local storage before each test
    window.localStorage.clear();
  });

  const tasks = [
    { description: 'Task 1', index: 1, completed: false },
    { description: 'Task 2', index: 2, completed: false },
    { description: 'Task 3', index: 3, completed: false },
  ];

  test('removes a task from the list', () => {
    const indexToRemove = 2;
    const expectedTasks = [
      { description: 'Task 1', index: 1, completed: false },
      { description: 'Task 3', index: 2, completed: false },
    ];
    removeTodo(tasks, indexToRemove);
    expect(JSON.parse(window.localStorage.getItem('tasks'))).toEqual(expectedTasks);
  });

  test('updates indexes of remaining tasks', () => {
    // Set up initial tasks
    const initialTasks = [
      { description: 'Task 1', index: 1, completed: false },
      { description: 'Task 2', index: 2, completed: false },
      { description: 'Task 3', index: 3, completed: false },
    ];

    // save to local storage
    window.localStorage.setItem('tasks', JSON.stringify(initialTasks));

    // Call removeTodo to remove task with index 2
    removeTodo(initialTasks, 2);

    const expectedTasks = [
      { description: 'Task 1', index: 1, completed: false },
      { description: 'Task 3', index: 2, completed: false },
    ];

    // Check that remaining tasks have updated indexes
    expect(JSON.parse(window.localStorage.getItem('tasks'))).toEqual(expectedTasks);
  });
});