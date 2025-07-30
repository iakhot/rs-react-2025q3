import { useRouteError } from 'react-router';
import { composeErrorMessage } from '../../common/utils';
import type { ApiError } from '../../App';

export function ErrorMessage(props: React.HTMLAttributes<HTMLDivElement>) {
  const error = useRouteError();
  return (
    <div
      data-testid="api-error"
      className={`warning text-center ${props.className}`}
    >
      <div>An error has occurred while loading the data:</div>
      <div>{composeErrorMessage(error as ApiError)}</div>
    </div>
  );
}
