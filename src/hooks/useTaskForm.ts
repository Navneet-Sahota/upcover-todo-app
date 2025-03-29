import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTaskStore from "../store/taskStore";

const schema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
});

type Params = {
  onSubmitCallback: (data: { title: string; description: string }) => void;
  initialValues?: { title: string; description: string };
  taskIdToIgnore?: string;
  onClose: () => void;
  isFormOpen: boolean;
};

const INITIAL_VALUES = { title: "", description: "" };

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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const titleValue = watch("title");

  const focusFirstError = () => {
    if (errors.title) titleRef.current?.focus();
    else if (errors.description) descriptionRef.current?.focus();
  };

  const onSubmit = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
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
