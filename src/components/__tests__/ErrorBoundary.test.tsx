import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

const BrokenComponent = () => {
  throw new Error("Simulated error");
};

describe("ErrorBoundary", () => {
  it("catches errors and renders fallback UI", () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
