import { composeErrorMessage } from '../../common/utils';
import type { SerializedError } from '@reduxjs/toolkit/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export function ErrorMessage({
  error,
  className = '',
}: {
  error: FetchBaseQueryError | SerializedError;
  className?: string;
}) {
  return (
    <div
      data-testid="api-error"
      className={`card warning text-center ${className}`}
    >
      <div>An error has occurred while loading the data:</div>
      <div>{composeErrorMessage(error)}</div>
    </div>
  );
}
