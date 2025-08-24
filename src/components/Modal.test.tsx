import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setup } from '../__tests__/setupTests';
import { createRef } from 'react';
import Modal from './Modal';
import UncontrolledForm from './UncontrolledForm';

describe('Modal', () => {
  it('opens a portal', async () => {
    const ref = createRef<HTMLElement>();
    const { ui } = setup(
      <div ref={ref}>
        <Modal container={ref} title="Open Controlled Form">
          <UncontrolledForm />
        </Modal>
      </div>
    );

    const open = screen.getByRole('button', { name: /Open*/i });
    expect(open).toBeInTheDocument();
    await ui.click(open);

    expect(screen.getByText(/Uncontrolled Form/i)).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
