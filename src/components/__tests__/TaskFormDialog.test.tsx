import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskFormDialog from "../TaskFormDialog";

const addTaskMock = jest.fn();
const mockStore = {
  addTask: addTaskMock,
  tasks: [],
};

jest.mock("../../store/taskStore", () => {
  return {
    __esModule: true,
    default: (selector: (store: typeof mockStore) => unknown) =>
      selector(mockStore),
  };
});

describe("TaskFormDialog", () => {
  beforeEach(() => {
    addTaskMock.mockClear();
    mockStore.tasks = [];
  });

  it("renders form and submits", async () => {
    const user = userEvent.setup();
    render(<TaskFormDialog open={true} onClose={() => {}} />);

    await user.type(screen.getByLabelText(/title/i), "Test Task");
    await user.type(screen.getByLabelText(/description/i), "Test Description");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(addTaskMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Task",
        description: "Test Description",
        completed: false,
      })
    );
  });

  it("shows validation error on empty submit", async () => {
    const user = userEvent.setup();
    render(<TaskFormDialog open={true} onClose={() => {}} />);
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(addTaskMock).not.toHaveBeenCalled();
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });
});
