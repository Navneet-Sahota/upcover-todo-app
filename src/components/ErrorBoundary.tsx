import { Component, ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box
            textAlign="center"
            py={6}
            px={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h6" gutterBottom>
              Something went wrong.
            </Typography>
            <Button variant="outlined" onClick={this.handleRetry}>
              Try Again
            </Button>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
