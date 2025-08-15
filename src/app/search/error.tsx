'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`An error has been caught: ${error}`);
  }, [error]);

  return (
    <div className="card min-vh70">
      <h2>Something went wrong...</h2>
      <button className="link-button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
