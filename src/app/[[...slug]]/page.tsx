import '../../index.css';
import { Welcome } from './Welcome';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <Welcome />;
}
