import React, { type ReactNode } from 'react';

type ComponentProps = {
  children: ReactNode;
};

type StateProps = {
  hasError: boolean;
};

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

  componentDidCatch(error: Error) {
    const ownerStack = React.captureOwnerStack();
    console.log(`An error has been caught: ${error.message} in ${ownerStack}`);
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
