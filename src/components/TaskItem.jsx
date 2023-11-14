import { IoIosAddCircleOutline } from "react-icons/io";
import { BiPlayCircle } from "react-icons/bi";
import { BsPauseCircle, BsPlayBtnFill, BsPlayCircle } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import EditTaskForm from "./EditTaskForm";
import { useEffect, useState } from "react";
import {
  calculateTotalActivityTime,
  calculateWeeklyActivity,
  formatTime,
} from "../utils/helper";

const TaskItem = ({
  task,
  toggleTaskActivity,
  editExitTask,
  removeTask,
  addTagToTask,
  removeTagFromTask,
  activeTaskId,
  setActiveTaskId,
  editTaskId,
  setEditTaskId,
  onClickTask,
  onEditTaskId,
}) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-7 mb-6 border p-3 rounded border-slate-400 shadow-md ring-0 hover:ring-1 cursor-pointer">
      <div className="w-full flex flex-row items-start justify-between gap-5">
        <div className="flex flex-row items-start justify-start gap-3">
          <div className="flex flex-col flex-wrap items-start justify-center gap-4 ">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h1
                className="text-xl font-semibold"
                onClick={(e) => onClickTask(e, task?.id)}
              >
                {task?.name}
              </h1>
              <span
                className={`text-sm font-semibold ${
                  task?.isActive ? " text-green-300" : "text-slate-300"
                }`}
              >
                <GoDotFill className="w-4 h-4" />
              </span>
            </div>
            <span className="text-sm font-semibold">
              <span className="">Total Active: </span>
              {task && calculateTotalActivityTime(task)}
            </span>

            {task?.lastStartTime && (
              <span className="text-sm font-semibold">
                <span className="">Last Started: </span>
                {formatTime(Date.now() - task?.lastStartTime)}
              </span>
            )}
            <div className="flex flex-row flex-wrap gap-4 items-center justify-start">
              {task?.tags?.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="flex flex-row items-center justify-center bg-slate-400/30 rounded-md px-2 py-1 mr-2"
                  >
                    <h1 className="text-sm font-semibold">{tag}</h1>
                    <button
                      onClick={(e) => {
                        removeTagFromTask(e, task?.id, tag);
                      }}
                      className="ml-2"
                    >
                      <AiOutlineCloseCircle className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-end gap-3">
          <button
            onClick={(e) => {
              toggleTaskActivity(task?.id);
            }}
          >
            {task?.isActive ? (
              <BsPlayCircle className="w-6 h-6" />
            ) : (
              <BsPauseCircle className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={(e) => {
              setIsEditTaskOpen(!isEditTaskOpen);
              onEditTaskId(e, task?.id);
            }}
          >
            <FaEdit className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              removeTask(e, task?.id);
            }}
          >
            <AiOutlineCloseCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isEditTaskOpen && editTaskId === task?.id && (
        <EditTaskForm
          task={task}
          editExitTask={editExitTask}
          isEditTaskOpen={isEditTaskOpen}
          setIsEditTaskOpen={setIsEditTaskOpen}
        />
      )}
    </div>
  );
};

export default TaskItem;
