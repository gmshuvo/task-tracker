import React, { useState } from "react";
import TagInput from "./TagInput";
import useFetch from "../hooks/useFetch";

function AddTaskForm({ addNewTask, isModalOpen, setIsModalOpen }) {
  const [newTaskName, setNewTaskName] = useState("");
  const [userTags, setUserTags] = useState([]);

  //input validation
  const taskNameError =
    newTaskName.trim() === "" ? "Task name cannot be empty" : null;
  const tagsError =
    userTags.length === 0
      ? "Please add at least one tag"
      : userTags.length > 5
      ? "You can add up to 5 tags"
      : null;

  const handleAddNewTask = () => {
    if (newTaskName.trim() !== "") {
      addNewTask({
        id: Math.floor(Math.random() * 10000),
        name: newTaskName,
        tags: userTags,
        active: false,
        activityLog: [],
        lastStartTime: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setNewTaskName("");
      setUserTags([]);
      setIsModalOpen(false);
    }
  };

  const {
    data: tags,
    error,
    loading,
  } = useFetch("http://localhost:3010/tags");
  // console.log(tags);

  return (
    <div className="mt-10 flex flex-col justify-center">
      <label htmlFor="newTaskName" className=" text-lg mb-2">
        Task Name
      </label>
      <input
        type="text"
        placeholder="New Task Name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        className="w-full bg-primary-content/30 rounded-md px-2 py-1 mb-4 outline-none focus:ring-2 focus:ring-primary"
      />
      {taskNameError && (
        <p className="text-red-500 text-sm mb-2">{taskNameError}</p>
      )}
      <label htmlFor="tags" className=" text-lg mb-2">
        Tags
      </label>

      {/* Add tags suggetions new tags*/}
      <TagInput
        suggestedTags={tags}
        setUserTags={setUserTags}
        userTags={userTags}
      />
      {tagsError && <p className="text-red-500 text-sm mb-2">{tagsError}</p>}
      <button
        onClick={handleAddNewTask}
        disabled={taskNameError || tagsError}
        className="absolute bottom-6 right-4 left-4 px-4 py-2 border bg-transparent rounded hover:bg-black/60 hover:text-white"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTaskForm;
