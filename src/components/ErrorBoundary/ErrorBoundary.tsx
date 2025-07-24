import React, { type ReactNode } from 'react';

interface ComponentProps {
  children: ReactNode;
}

interface StateProps {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ComponentProps, StateProps> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { hasError: false };
    this.resetError = this.resetError.bind(this);
  }

  resetError() {
    this.setState({ hasError: false });
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.log(
      `An error has been caught: ${error.message} ${errorInfo.componentStack}`
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>
          Something went wrong...{' '}
          <button
            className="link-button"
            onClick={() => {
              this.resetError();
            }}
          >
            Try again
          </button>
        </p>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
