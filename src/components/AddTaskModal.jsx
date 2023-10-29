import TaskForm from "./AddTaskForm";

const AddTaskModal = ({ isModalOpen, setIsModalOpen, addNewTask }) => {
  return (
    <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
      <div className="modal-box p-0  max-w-2xl h-[400px] relative bg-slate-300">
        <button
          className="text-gray-500 absolute w-8 h-8 rounded-full text-center text-sm hover:bg-slate-500/20 bg-slate-500/10 top-2 right-2 z-40"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
        {/* Add Task Form */}
        <TaskForm addNewTask={addNewTask} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      </div>
      <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
    </div>
  );
};

export default AddTaskModal;
