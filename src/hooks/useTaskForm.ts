import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useTaskStore from "../store/taskStore";
import { FieldData } from "../components/TaskFormBody";

const schema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
});

type FormSchema = z.infer<typeof schema>;

type Params = {
  onSubmitCallback: (data: { title: string; description: string }) => void;
  initialValues?: { title: string; description: string };
  taskIdToIgnore?: string;
  onClose: () => void;
  isFormOpen: boolean;
};

const INITIAL_VALUES: FieldData = { title: "", description: "" };

export default function useTaskForm({
  onSubmitCallback,
  initialValues = INITIAL_VALUES,
  taskIdToIgnore,
  onClose,
  isFormOpen,
}: Params) {
  const tasks = useTaskStore((s) => s.tasks);
  const [duplicateError, setDuplicateError] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const titleValue = watch("title");

  const focusFirstError = () => {
    if (errors.title) titleRef.current?.focus();
    else if (errors.description) descriptionRef.current?.focus();
  };

  const onSubmit: SubmitHandler<FieldData> = async ({ title, description }) => {
    const valid = await trigger();
    if (!valid) {
      focusFirstError();
      return;
    }

    const duplicate = tasks.some(
      (t) =>
        t.id !== taskIdToIgnore &&
        t.title.toLowerCase() === title.trim().toLowerCase()
    );
    if (duplicate) {
      setDuplicateError("A task with this title already exists.");
      setError("title", { message: "Duplicate title" });
      titleRef.current?.focus();
      return;
    }

    onSubmitCallback({ title: title.trim(), description: description.trim() });
    reset();
    setDuplicateError("");
    onClose();
  };

  useEffect(() => {
    if (isFormOpen) {
      reset(initialValues);
      setDuplicateError("");
      setTimeout(() => titleRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormOpen]);

  useEffect(() => {
    if (titleValue && duplicateError) {
      const duplicate = tasks.some(
        (t) =>
          t.id !== taskIdToIgnore &&
          t.title.toLowerCase() === titleValue.trim().toLowerCase()
      );
      if (!duplicate) {
        setDuplicateError("");
        clearErrors("title");
      }
    }
  }, [titleValue, duplicateError, clearErrors, tasks, taskIdToIgnore]);

  return {
    control,
    handleSubmit,
    onSubmit,
    titleRef,
    descriptionRef,
    errors,
    duplicateError,
  };
}
