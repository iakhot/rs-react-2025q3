import Link from 'next/link';
import './index.css';

export function About() {
  return (
    <div className="card center vw50 flex-column">
      <h2>
        Welcome to Movies search app - a training project for {''}
        <Link
          href="https://rs.school/courses/reactjs"
          rel="noopener noreferrer"
        >
          RS School React course.
        </Link>
      </h2>
      <p>
        Made with love by{' '}
        <Link href="https://github.com/iakhot" rel="noopener noreferrer">
          iakhot
        </Link>
      </p>
    </div>
  );
}
