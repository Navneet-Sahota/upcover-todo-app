import { Box } from "@mui/material";
import TaskCard from "./TaskCard";

type Props = {
  status: "complete" | "incomplete";
};

export default function TaskList({ status }: Props) {
  return (
    <Box mt={2}>
      <TaskCard title="Sample Task" completed={status === "complete"} />
    </Box>
  );
}
