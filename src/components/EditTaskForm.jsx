import { useState } from "react";
import TagInput from "./TagInput";

const EditTaskForm = ({ task, editExitTask, setIsEditTaskOpen }) => {
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [userTags, setUserTags] = useState(task.tags);

  //input validation
  const taskNameError =
    newTaskName.trim() === "" ? "Task name cannot be empty" : null;
  const tagsError =
    userTags.length === 0
      ? "Please add at least one tag"
      : userTags.length > 5
      ? "You can add up to 5 tags"
      : null;

  const handleUpdatedTask = (e) => {
    if (newTaskName.trim() !== "") {
      editExitTask(e, {
        ...task,
        name: newTaskName,
        tags: userTags,
        updatedAt: Date.now(),
      });
      setNewTaskName("");
      setUserTags([]);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center">
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
        <TagInput setUserTags={setUserTags} userTags={userTags} />
        {tagsError && <p className="text-red-500 text-sm mb-2">{tagsError}</p>}
      </div>

      <div className="flex items-center justify-end gap-4 ">
        <button
          onClick={() => setIsEditTaskOpen(false)}
          className="mt-3 flex px-4 py-2 border bg-transparent rounded hover:bg-black/40 hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdatedTask}
          disabled={taskNameError || tagsError}
          className="mt-3 flex px-4 py-2 border bg-transparent rounded hover:bg-black/40 hover:text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
