import type { Movie } from '../App';

export const DUMMY_ERROR = 'Simulated error in ChildComponent';
export const ErrorDummy = ({
  shouldThrow = false,
  message = DUMMY_ERROR,
}: {
  shouldThrow?: boolean;
  message?: string;
}) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>Dummy is rendered</div>;
};

export const movieStub: Movie = {
  id: 123,
  name: 'Star Wars',
  description: 'A long time ago, in a galaxy far, far away...',
};
