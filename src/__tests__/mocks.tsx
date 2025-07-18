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
