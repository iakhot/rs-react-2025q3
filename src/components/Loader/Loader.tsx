import reactLogo from '../../assets/react.svg';
import './index.css';

function Loader() {
  return (
    <img
      src={reactLogo}
      data-testid="loader"
      className="logo react"
      aria-label="Loading results"
      alt="React logo"
    />
  );
}

export default Loader;
