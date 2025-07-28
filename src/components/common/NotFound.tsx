import './index.css';

export function NotFound() {
  return (
    <div className="error-page flex-row">
      <span className="error-code">404</span>
      <span className="error-message warning">
        We couldn&apos;t find this page.
      </span>
    </div>
  );
}
