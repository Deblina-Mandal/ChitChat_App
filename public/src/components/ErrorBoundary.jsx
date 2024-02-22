import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in component:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", textAlign: "center" }}>
          <h2>Oops! Something went wrong.</h2>
          <p>We apologize for the inconvenience.</p>
          {/* Additional custom error messages or UI elements can be added */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
