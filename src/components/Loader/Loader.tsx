import Image from 'next/image';
import './index.css';
import logo from '../../assets/react.svg';

function Loader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Image
        src={logo}
        data-testid="loader"
        className="logo react"
        aria-label="Loading results"
        alt="React logo"
      />
    </div>
  );
}

export default Loader;
