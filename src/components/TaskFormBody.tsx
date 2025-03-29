import { Stack } from "@mui/material";
import AnimatedTextField from "./AnimatedTextField";
import DuplicateErrorAlert from "./DuplicateErrorAlert";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

interface FieldValues {
  title: string;
  description: string;
}

export default function TaskFormBody({
  control,
  errors,
  titleRef,
  descriptionRef,
  duplicateError,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any, FieldValues>;
  errors: FieldErrors<FieldValues>;
  titleRef: React.RefObject<HTMLInputElement | null>;
  descriptionRef: React.RefObject<HTMLInputElement | null>;
  duplicateError?: string;
}) {
  return (
    <Stack spacing={2} mt={1}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <AnimatedTextField
            label="Title"
            fullWidth
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title?.message}
            inputRef={titleRef}
            hasError={!!errors.title}
            {...field}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <AnimatedTextField
            label="Description"
            fullWidth
            multiline
            minRows={4}
            maxRows={6}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description?.message}
            inputRef={descriptionRef}
            hasError={!!errors.description}
            {...field}
          />
        )}
      />

      <DuplicateErrorAlert message={duplicateError} />
    </Stack>
  );
}
