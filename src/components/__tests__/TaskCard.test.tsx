import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskCard from "../TaskCard";

interface MockStore {
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const toggleMock = jest.fn();
const deleteMock = jest.fn();

jest.mock("../../store/taskStore", () => ({
  __esModule: true,
  default: (selector: (store: MockStore) => unknown) =>
    selector({
      toggleComplete: toggleMock,
      deleteTask: deleteMock,
    }),
}));

describe("TaskCard", () => {
  beforeEach(() => {
    toggleMock.mockClear();
    deleteMock.mockClear();
  });

  it("calls toggleComplete when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskCard
        id="task-1"
        title="Test Task"
        description="A task"
        completed={false}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(toggleMock).toHaveBeenCalledWith("task-1");
  });

  it("calls deleteTask after confirming delete dialog", async () => {
    const user = userEvent.setup();
    render(
      <TaskCard
        id="task-1"
        title="Test Task"
        description="A task"
        completed={false}
      />
    );

    const deleteBtn = screen.getByTestId("delete-icon");
    await user.click(deleteBtn);

    const confirmBtn = await screen.findByTestId("confirm-delete");
    await user.click(confirmBtn);

    expect(deleteMock).toHaveBeenCalledWith("task-1");
  });
});
