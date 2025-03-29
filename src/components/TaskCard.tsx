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

type Props = {
  title: string;
  description?: string;
  completed?: boolean;
};

export default function TaskCard({ title, description, completed }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderColor: "#e5e7eb",
        background: "#ffffff",
        transition: "box-shadow 0.2s ease-in-out",
      }}
    >
      <CardContent sx={{ px: 2, py: 1.5 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack alignSelf="start">
            <Checkbox checked={completed} />
          </Stack>
          <Stack width="100%">
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              minHeight="42px"
            >
              <Typography
                variant="subtitle1"
                flex={1}
                sx={{
                  fontWeight: 500,
                  textDecoration: completed ? "line-through" : "none",
                  color: completed ? "text.secondary" : "text.primary",
                  cursor: "pointer",
                }}
                onClick={() => setOpen((prev) => !prev)}
              >
                {title}
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
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
  );
}
