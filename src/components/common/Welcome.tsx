import React from 'react';
import Link from 'next/link';

export function Welcome() {
  return (
    <div className="card center vw50 flex-column">
      <h1>Welcome to Movies search app</h1>
      <button>
        <Link href="/search"> Start Search</Link>
      </button>
    </div>
  );
}
