import { IoIosAddCircleOutline } from "react-icons/io";
import { BiPlayCircle } from "react-icons/bi";
import { BsPauseCircle } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import EditTaskForm from "./EditTaskForm";


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
  
}) => {
  console.log(task);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-7 mb-6 border p-3 rounded border-slate-400 shadow-md ring-0 hover:ring-1 cursor-pointer">
      <div className="w-full flex flex-row items-start justify-between gap-5">
        <div className="flex flex-row items-start justify-start">
          <div className="flex flex-col flex-wrap items-start justify-center gap-4 ">
            <h1 className="text-xl font-semibold">{task.name}</h1>
            <div className="flex flex-row flex-wrap gap-4 items-center justify-start">
              {task.tags?.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="flex flex-row items-center justify-center bg-slate-400/30 rounded-md px-2 py-1 mr-2"
                  >
                    <h1 className="text-sm font-semibold">{tag}</h1>
                    <button
                      onClick={(e) => {removeTagFromTask(task.id, tag)}}
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
            onClick={() => {
              toggleTaskActivity(task.id);
            }}
          >
            <BsPauseCircle className="w-6 h-6" />
            {/* {activeTaskId === task.id ? (
              task.active ? (
                <BsPauseCircle className="w-6 h-6" />
              ) : (
                <BiPlayCircle className="w-6 h-6" />
              )
            ) : (
              <BiPlayCircle className="w-6 h-6" />
            )} */}
          </button>
          <button
            onClick={() => {
              setEditTaskId(task.id);
            }}
          >
            <FaEdit className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              removeTask(task.id);
            }}
          >
            <AiOutlineCloseCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
      {editTaskId === task.id && (
        <EditTaskForm task={task} editExitTask={editExitTask}/>
        // <div className="w-full flex flex-col items-center justify-center mt-4 mb-4">
        //   <input
        //     type="text"
        //     className="w-full bg-primary-content/30 rounded-md px-2 py-1"
        //     placeholder="Task name"
        //     value={task.name}
        //     onChange={(e) => editTaskName(task.id, e.target.value)}
        //   />
        //   <div className=" w-full flex flex-row items-center justify-between mt-4">
        //     <input
        //       type="text"
        //       className="w-full bg-primary-content/30 rounded-md px-2 py-1 mr-2"
        //       placeholder="Tag name"
        //       value={task.newTag}
        //       onChange={(e) => {
        //         addTagToTask(task.id, e.target.value);
        //       }}
        //     />
        //     <button
        //       onClick={() => {
        //         addTagToTask(task.id, task.newTag);
        //       }}
        //     >
        //       <IoIosAddCircleOutline className="w-6 h-6" />
        //     </button>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default TaskItem;
