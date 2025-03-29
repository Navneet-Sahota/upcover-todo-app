import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updated: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  reorderTasks: (
    status: "complete" | "incomplete",
    from: number,
    to: number
  ) => void;
};

const useTaskStore = create<State>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((s) => ({ tasks: [{ ...task, id: nanoid() }, ...s.tasks] })),
      updateTask: (id, updated) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updated } : t)),
        })),
      deleteTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      toggleComplete: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      reorderTasks: (status, from, to) =>
        set((s) => {
          const tasks = [...s.tasks];
          const filtered = tasks.filter(
            (t) => t.completed === (status === "complete")
          );
          const task = filtered[from];
          if (!task) return { tasks };

          const unchanged = tasks.filter(
            (t) => t.completed !== (status === "complete")
          );
          const updated = [...filtered];
          updated.splice(from, 1);
          updated.splice(to, 0, task);

          return { tasks: [...updated, ...unchanged] };
        }),
    }),
    { name: "task-storage" }
  )
);

export default useTaskStore;
