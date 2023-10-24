import React, { useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import TaskItem from "../components/TaskItem";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import AddTaskModal from "../components/AddTaskModal";
import FetchData from "../utils/FetchData";
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

  if(tasks){
    tasks.sort((a, b)=>{
      return b.createdAt - a.createdAt;
    })
  }

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

  const removeTagFromTask = async(taskId, tagToRemove) => {
    // Implement the logic to remove a tag from a task
    const filteredTags = tasks.find((task) => task.id === taskId).tags.filter((tag) => tag !== tagToRemove);
    console.log(filteredTags);
    const { error } = await FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tasks.find((task) => task.id === taskId).tags.filter((tag) => tag !== tagToRemove)
      }),
    })

    if (error) {
      console.log(error);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, tags: task.tags.filter((tag) => tag !== tagToRemove) }
          : task
      )
    );
  };

  const addNewTask = async (newTask) => {
    console.log(newTask);
    const { data, error } = await FetchData("http://localhost:3010/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    setTasks((prevTasks) => [data, ...prevTasks]);
  };

  const removeTask = async (taskId) => {
    // Implement the logic to remove a task
    const { error } = await FetchData(
      `http://localhost:3010/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (error) {
      console.log(error);
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <div className=" flex items-center justify-center mt-10">
        {/* Add Button Open creatTaskModal*/}
        {/* Task List Container */}
        <div className="mt-10 mb-10 min-h-[300px] w-full md:w-[70%] lg:w-[60%] bg-primary-content/30 rounded-md shadow">
          <div className="flex flex-col items-center justify-center py-3 px-10">
            {/* Task List */}
            {/* Task Item */}
            <div className="w-full mt-4 text-3xl font-semibold mb-10 flex items-center justify-between">
              
              <h1 className="whitespace-nowrap text-center">Track your tasks 🚀</h1>
              <AddTaskButton setIsModalOpen={setIsModalOpen} />
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="max-h-[600px] min-h-full  w-full  overflow-y-scroll ">
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
      {isModalOpen && (
        <AddTaskModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          addNewTask={addNewTask}
        />
      )}
    </>
  );
};

export default Home;
