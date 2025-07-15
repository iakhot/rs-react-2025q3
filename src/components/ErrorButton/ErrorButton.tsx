import { useState } from 'react';

class UnexpectedError extends Error {}

function ErrorButton() {
  const [, setError] = useState(false);

  const handleClick = () => {
    setError(() => {
      throw new UnexpectedError('Oops, something has happened ...');
    });
  };
  return <button onClick={handleClick}>Throw error</button>;
}

export default ErrorButton;
