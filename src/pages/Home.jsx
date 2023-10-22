import React, { useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import TaskItem from "../components/TaskItem";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import AddTaskModal from "../components/AddTaskModal";
const Home = () => {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //fetch all tasks
  const {
    data: tasks,
    error,
    loading,
    setData: setTasks,
  } = useFetch("http://localhost:3010/tasks");

  console.log(tasks);

  if (error) {
    return <h1>Error</h1>;
  }

  const toggleTaskActivity = (taskId) => {
    // Implement the logic to toggle task activity
  };

  const editTaskName = (taskId, newName) => {
    // Implement the logic to edit task name
  };

  const addTagToTask = (taskId, newTag) => {
    // Implement the logic to add a tag to a task
  };

  const removeTagFromTask = (taskId, tagToRemove) => {
    // Implement the logic to remove a tag from a task
    console.log(taskId, tagToRemove);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, tags: task.tags.filter((tag) => tag !== tagToRemove) }
          : task
      )
    );
  };

  const addNewTask = () => {
    // const newTask = {
    //   id: tasks.length + 1,
    //   name: "New Task",
    //   tags: [],
    //   active: false,
    //   activityLog: [],
    //   lastStartTime: null,
    // };
    // setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (taskId) => {
    // Implement the logic to remove a task
    console.log(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleModalOpen = () => {
    // Implement the logic to open the modal
  };

  return (
    <>
      <div className="mt-11 flex flex-col items-center justify-center">
        {/* Add Button Open creatTaskModal*/}
        <AddTaskButton setIsModalOpen={setIsModalOpen} />
        {/* Task List Container */}
        <div className="mt-10 mb-10 min-h-[300px] w-full md:w-[70%] lg:w-[60%] bg-primary-content/30 rounded-md shadow">
          <div className="flex flex-col items-center justify-center py-3 px-10">
            {/* Task List */}
            {/* Task Item */}
            <div className="mt-4 text-3xl font-semibold mb-10">
              <h1>Track your tasks 🚀</h1>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="max-h-[500px] min-h-full  w-full md:w-[90%] overflow-y-scroll ">
                {tasks?.length > 0 ? (
                  tasks?.map((task) => {
                    return (
                      <TaskItem
                        key={task.id}
                        task={task}
                        toggleTaskActivity={toggleTaskActivity}
                        editTaskName={editTaskName}
                        removeTask={removeTask}
                        addTagToTask={addTagToTask}
                        removeTagFromTask={removeTagFromTask}
                        activeTaskId={activeTaskId}
                        setActiveTaskId={setActiveTaskId}
                      />
                    );
                  })
                ) : (
                  <div className="mt-4 text-3xl font-semibold mb-10 text-center">
                    <h1>No tasks found</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && <AddTaskModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} addNewTask={addNewTask}/>}
    </>
  );
};

export default Home;
