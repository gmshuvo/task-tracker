import React, { useState } from 'react';

function TaskForm({ addNewTask }) {
  const [newTaskName, setNewTaskName] = useState('');

  const handleNewTaskNameChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleAddNewTask = () => {
    if (newTaskName.trim() !== '') {
      addNewTask(newTaskName);
      setNewTaskName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New Task Name"
        value={newTaskName}
        onChange={handleNewTaskNameChange}
      />
      <button onClick={handleAddNewTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;
