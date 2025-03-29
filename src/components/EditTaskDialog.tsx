import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskFormBody from "./TaskFormBody";
import useTaskStore, { Task } from "../store/taskStore";
import useTaskForm from "../hooks/useTaskForm";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  task: Task;
};

export default function EditTaskDialog({ open, onClose, task }: Props) {
  const updateTask = useTaskStore((s) => s.updateTask);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    onSubmit,
    titleRef,
    descriptionRef,
    errors,
    duplicateError,
  } = useTaskForm({
    onSubmitCallback: (data) => updateTask(task.id, data),
    onClose,
    initialValues: { title: task.title, description: task.description || "" },
    taskIdToIgnore: task.id,
    isFormOpen: open,
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          pt: 2,
        }}
      >
        <DialogTitle sx={{ p: 0 }}>Edit Task</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ px: 3 }}>
            <TaskFormBody
              control={control}
              errors={errors}
              titleRef={titleRef}
              descriptionRef={descriptionRef}
              duplicateError={duplicateError}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} variant="text">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </motion.div>
    </Dialog>
  );
}
