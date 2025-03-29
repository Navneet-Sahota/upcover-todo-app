import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          pr: 2,
          pb: 2,
        }}
      >
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          data-testid="confirm-delete"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
