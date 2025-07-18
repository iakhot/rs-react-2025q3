import React from 'react';

export class UnexpectedError extends Error {}

class ErrorButton extends React.Component {
  state = { error: null };

  handleClick = () => {
    this.setState(() => {
      throw new UnexpectedError('Oops, something has happened ...');
    });
  };

  render() {
    return (
      <button className="float-right" onClick={this.handleClick}>
        Throw error
      </button>
    );
  }
}

export default ErrorButton;
