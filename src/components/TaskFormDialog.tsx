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
import useTaskStore from "../store/taskStore";
import TaskFormBody from "./TaskFormBody";
import useTaskForm from "../hooks/useTaskForm";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TaskFormDialog({ open, onClose }: Props) {
  const addTask = useTaskStore((s) => s.addTask);
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
    onSubmitCallback: (data) => addTask({ ...data, completed: false }),
    onClose,
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
        <DialogTitle sx={{ p: 0 }}>Add Task</DialogTitle>
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
              Add
            </Button>
          </DialogActions>
        </form>
      </motion.div>
    </Dialog>
  );
}
