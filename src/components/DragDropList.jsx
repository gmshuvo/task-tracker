import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const handleOnDragEnd = (result) => {
}

const DragDropList = ({ task }) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="max-h-[600px] min-h-full  w-full  overflow-y-scroll ">
            {task.map((task, index) => {
              return (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {task.name}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropList;