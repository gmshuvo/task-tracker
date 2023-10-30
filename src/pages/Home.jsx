import React, { useEffect, useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import TaskItem from "../components/TaskItem";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import AddTaskModal from "../components/AddTaskModal";
import FetchData from "../utils/FetchData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { calculateTotalActivityTime } from "../utils/helper";
import { useLayoutEffect } from "react";

const Home = () => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState(null);

  const navigate = useNavigate();

  //fetch all tasks

  // const {data:tasks, setData:setTasks,  error, loading} = useFetch("http://localhost:3010/tasks");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await FetchData("http://localhost:3010/tasks");
        if (error) {
          console.error("Error fetching tasks:", error);
          return;
        }
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    const interval = setInterval(() => {
      fetchTasks();
    }, 60000);
    fetchTasks();
    return () => clearInterval(interval);
  }, []);

  if (tasks) {
    tasks.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  }

  console.log(tasks);

  const onClickTask = (e, taskId) => {
    e.stopPropagation();
    navigate(`/task/${taskId}`);
  };

  const onEditTaskId = (e, taskId) => {
    e.stopPropagation();
    setEditTaskId(taskId);
  };

  const toggleTaskActivity = (taskId) => {
    // Implement the logic to toggle task activity
    // here i want to fetch the task first and check
    // if task is already isActivte or not
    // if it is active then i want to update the task activityLog
    // start time and end time
    // else i want to update the task lastStartTime

    const activeTask = tasks.find((task) => task.id === taskId);
    // console.log(activeTask);
    const isActive = activeTask?.isActive;
    const activityLog = activeTask?.activityLog;
    const lastStartTime = activeTask?.lastStartTime;
    let updatedTask = {};

    if (isActive) {
      updatedTask = {
        ...activeTask,
        isActive: false,
        activityLog: [
          ...activityLog,
          {
            startTime: lastStartTime,
            endTime: Date.now(),
          },
        ],
      };
    } else {
      updatedTask = {
        ...activeTask,
        isActive: true,
        lastStartTime: Date.now(),
      };
    }

    const { error } = FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (error) {
      toast.error("Error updating task");
      console.log(error);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  const editExitTask = (e, updatedTask) => {
    e.stopPropagation();
    // Implement the logic to edit task name
    const { error } = FetchData(
      `http://localhost:3010/tasks/${updatedTask.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    );

    if (error) {
      toast.error("Error updating task");
      console.log(error);
      return;
    }
    toast.success("Task updated successfully");
    setEditTaskId(null);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const addTagToTask = (taskId, newTag) => {
    // Implement the logic to add a tag to a task
  };

  const removeTagFromTask = async (e, taskId, tagToRemove) => {
    e.stopPropagation();
    // Implement the logic to remove a tag from a task
    const filteredTags = tasks
      .find((task) => task.id === taskId)
      .tags.filter((tag) => tag !== tagToRemove);
    console.log(filteredTags);
    const { error } = await FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tasks
          .find((task) => task.id === taskId)
          .tags.filter((tag) => tag !== tagToRemove),
      }),
    });

    if (error) {
      toast.error("Error removing tag");
      console.log(error);
      return;
    }
    toast.success("Tag removed successfully");
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
      toast.error("Error adding task");
      console.log(error);
      return;
    }
    toast.success("Task added successfully");
    setTasks((prevTasks) => [data, ...prevTasks]);
  };

  const removeTask = async (e, taskId) => {
    e.stopPropagation();
    // Implement the logic to remove a task
    const { error } = await FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (error) {
      toast.error("Error removing task");
      console.log(error);
      return;
    }
    toast.success("Task removed successfully");
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <div className=" flex items-center justify-center mt-16 mb-32">
        {/* Add Button Open creatTaskModal*/}
        {/* Task List Container */}
        <div className="mt-10 mb-10 min-h-[300px] w-full md:w-[70%] lg:w-[60%] bg-slate-400/20 rounded-md shadow">
          <div className="flex flex-col items-center justify-center py-3 px-10">
            {/* Task List */}
            {/* Task Item */}
            <div className="w-full mt-4 text-3xl font-semibold mb-10 flex items-center justify-between">
              <h1 className="whitespace-nowrap text-center">
                Track your tasks 🚀
              </h1>
              <AddTaskButton setIsModalOpen={setIsModalOpen} />
            </div>
            {false ? (
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
                        editExitTask={editExitTask}
                        removeTask={removeTask}
                        addTagToTask={addTagToTask}
                        removeTagFromTask={removeTagFromTask}
                        editTaskId={editTaskId}
                        setEditTaskId={setEditTaskId}
                        activeTaskId={activeTaskId}
                        setActiveTaskId={setActiveTaskId}
                        onClickTask={onClickTask}
                        onEditTaskId={onEditTaskId}
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
