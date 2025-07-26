import reactLogo from '../../assets/react.svg';
import './index.css';

function Loader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <img
        src={reactLogo}
        data-testid="loader"
        className="logo react"
        aria-label="Loading results"
        alt="React logo"
      />
    </div>
  );
}

export default Loader;
