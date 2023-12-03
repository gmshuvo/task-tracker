import React, { useEffect, useState } from "react";
import AddTaskButton from "../components/AddTaskButton";
import TaskItem from "../components/TaskItem";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import AddTaskModal from "../components/AddTaskModal";
import FetchData from "../utils/FetchData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../utils/StrictModeDroppable";

const Home = () => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  //fetch all tasks

  const { data, setData, error, loading } = useFetch(
    "http://localhost:3010/tasks"
  );

  const [tasks, setTasks] = useState(data );

  useEffect(() => {
    const arrayIdOrder = JSON.parse(localStorage.getItem("taskIdOrder"));
    //if not set taskIdOrder in localstorage
    if (!arrayIdOrder && data?.length) {
      localStorage.setItem(
        "taskIdOrder",
        JSON.stringify(data?.map((task) => task.id))
      );
    }

    //if set in localstorage
    let updatedTasks = [];
    if (arrayIdOrder?.length && data?.length) {
      updatedTasks = arrayIdOrder.map((id) =>
        data.find((task) => task.id === id)
      );

      const newTasks = data.filter((task) => !arrayIdOrder.includes(task.id));
      updatedTasks = [...newTasks, ...updatedTasks];
    }

    setTasks(updatedTasks || data);
  }, [data]);

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
            endTime: new Date().toISOString(),
          },
        ],
      };
    } else {
      updatedTask = {
        ...activeTask,
        isActive: true,
        lastStartTime: new Date().toISOString(),
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
    //remove this task id from localstorage
    const arrayIdOrder = JSON.parse(localStorage.getItem("taskIdOrder"));
    const updatedArrayIdOrder = arrayIdOrder.filter((id) => id !== taskId);
    localStorage.setItem("taskIdOrder", JSON.stringify(updatedArrayIdOrder));
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const OnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // setTasks(items);
    const idsOrderArray = items.map((task) => task.id);
    // set tasksOrderId from localstorage
    localStorage.setItem("taskIdOrder", JSON.stringify(idsOrderArray));
    // update taskIdOrder
    setTasks(items);

    console.log(items);
  };

  return (
    <>
      <div className=" flex items-center justify-center mt-8 mb-32">
        {/* Task List Container */}
        <div className="mt-10 mb-10 min-h-[300px] w-full md:w-[70%] lg:w-[60%] bg-slate-400/20 rounded-md shadow">
          <div className="flex flex-col items-center justify-center py-3 px-10">
            {/* Task List */}
            {/* Task Item */}
            <div className="w-full mt-4 text-3xl font-semibold mb-10 flex items-center justify-between">
              {/* <h1 className="whitespace-nowrap text-center">
                Track your tasks 🚀
              </h1> */}
              <AddTaskButton setIsModalOpen={setIsModalOpen} />
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DragDropContext onDragEnd={OnDragEnd}>
                <Droppable droppableId="tasks">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="max-h-[600px] min-h-full  w-full  overflow-y-scroll "
                    >
                      {tasks?.map((task, index) => {
                        return (
                          <Draggable
                            key={task?.id}
                            draggableId={task?.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskItem
                                  key={task?.id}
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
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
