import TaskCard from "./TaskCard";
import useTaskStore from "../store/taskStore";

type Props = {
  status: "complete" | "incomplete";
};

export default function TaskList({ status }: Props) {
  const tasks = useTaskStore((s) => s.tasks);

  const filtered = tasks.filter((t) => t.completed === (status === "complete"));

  return (
    <>
      {filtered.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </>
  );
}
