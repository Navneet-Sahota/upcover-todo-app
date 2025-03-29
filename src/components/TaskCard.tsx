import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Stack,
  Typography,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import useTaskStore, { Task } from "../store/taskStore";
import EditTaskDialog from "./EditTaskDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

interface TaskCardProps extends Task {
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
}

export default function TaskCard(props: TaskCardProps) {
  const toggle = useTaskStore((s) => s.toggleComplete);
  const onDelete = useTaskStore((s) => s.deleteTask);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { title, description, completed, dragHandleProps } = props;

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent sx={{ px: 2, py: 1.5 }}>
          <Stack direction="row" alignItems="start" gap={1}>
            <span
              {...dragHandleProps}
              style={{ display: "flex", cursor: "grab", paddingTop: "10px" }}
            >
              <DragIndicatorIcon sx={{ color: "text.disabled" }} />
            </span>
            <Stack alignSelf="start">
              <Checkbox
                checked={completed}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(props.id);
                }}
              />
            </Stack>
            <Stack width="100%">
              <Stack
                direction="row"
                gap={1}
                alignItems="start"
                justifyContent="space-between"
                py="7px"
              >
                <Typography
                  variant="subtitle1"
                  flex={1}
                  sx={{
                    textDecoration: completed ? "line-through" : "none",
                    color: completed ? "text.secondary" : "text.primary",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {title}
                </Typography>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOpen(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" data-testid="delete-icon" />
                  </IconButton>
                </Stack>
              </Stack>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Typography
                  variant="body2"
                  sx={{ pt: 0.5, color: "text.secondary" }}
                >
                  {description}
                </Typography>
              </Collapse>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <EditTaskDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={props}
      />

      <ConfirmDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          onDelete(props.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}
