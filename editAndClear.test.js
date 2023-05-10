/**
 * @jest-environment jsdom
*/
import { updateTask, completeTask, clearCompleted } from './src/modules/updateTask.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('updateTask function', () => {
  beforeEach(() => {
    localStorageMock.clear();
    const task = [{ index: 1, description: 'Task 1', completed: false }];
    localStorageMock.setItem('tasks', JSON.stringify(task));
  });

  test('should edit the description of a task', () => {
    // Arrange
    const id = 1;
    const description = 'Updated Task 1';

    // Act
    updateTask(id, description);

    // Assert
    const tasks = JSON.parse(localStorageMock.getItem('tasks'));
    expect(tasks[0].description).toBe(description);
  });
});

describe('completeTask function', () => {
  beforeEach(() => {
    localStorageMock.clear();
    const task = [{ index: 1, description: 'Task 1', completed: false }];
    localStorageMock.setItem('tasks', JSON.stringify(task));
  });

  test('completeTask updates the completion status of a task in local storage', () => {
    // Arrange or Set up initial tasks array
    const tasks = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
    ];

    // Set tasks array in local storage
    localStorageMock.setItem('tasks', JSON.stringify(tasks));

    // Act or Call completeTask to update the completion status of Task 1 to true
    completeTask(1, true);

    // Retrieve updated tasks array from local storage
    const updatedTasks = JSON.parse(localStorageMock.getItem('tasks'));

    // Asset or Verify that Task 1 completion status is updated
    expect(updatedTasks[0].completed).toBe(true);

    // Verify that Task 2 and Task 3 completion statuses are unchanged
    expect(updatedTasks[1].completed).toBe(false);
    expect(updatedTasks[2].completed).toBe(false);
  });
});

describe('clearCompleted function', () => {
  beforeEach(() => {
    localStorageMock.clear();
    const task = [{ index: 1, description: 'Task 1', completed: false }];
    localStorageMock.setItem('tasks', JSON.stringify(task));
  });

  test('Clear all completed tasks', () => {
    clearCompleted();
    const tasks = JSON.parse(localStorageMock.getItem('tasks'));
    const completedTasks = tasks.filter((task) => task.completed);
    expect(completedTasks.length).toEqual(0);
  });
});