import 'index.css';
import { Welcome } from 'components/common/Welcome';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <Welcome />;
}
