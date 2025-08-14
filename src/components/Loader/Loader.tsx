import Image from 'next/image';
import './index.css';

function Loader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Image
        src="/react.svg"
        data-testid="loader"
        className="logo react"
        aria-label="Loading results"
        alt="React logo"
      />
    </div>
  );
}

export default Loader;
