import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import useTaskStore from "../store/taskStore";
import TaskCard from "./TaskCard";
import { forwardRef } from "react";
import { AnimatePresence } from "framer-motion";

export default function DragDropList({
  status,
}: {
  status: "complete" | "incomplete";
}) {
  const tasks = useTaskStore((s) => s.tasks);
  const reorderTasks = useTaskStore((s) => s.reorderTasks);
  const filtered = tasks.filter((t) => t.completed === (status === "complete"));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from !== to) reorderTasks(status, from, to);
  };

  const MotionBox = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={status}
        isDropDisabled={false}
        isCombineEnabled={false}
      >
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            <AnimatePresence>
              {filtered.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <MotionBox
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard {...task} />
                    </MotionBox>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}
