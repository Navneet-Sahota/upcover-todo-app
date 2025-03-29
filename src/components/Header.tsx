import { Stack, Typography } from "@mui/material";
import InlineTaskForm from "./InlineTaskForm";

export default function Header() {
  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h4" fontWeight={700}>
        Todos
      </Typography>

      <InlineTaskForm />
    </Stack>
  );
}
