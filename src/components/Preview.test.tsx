import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as Const from '../common/const';

import { dataMock } from '../__tests__/mocks';
import Preview from './Preview';

describe('Preview', () => {
  it('renders fields correctly', () => {
    render(<Preview data={dataMock} changedFields={[]} />);

    expect(screen.queryByText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText(Const.NAME)).toHaveValue('Bob');
    expect(screen.getByText(Const.AGE)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.AGE)).toHaveValue('22');
    expect(screen.getByText(Const.EMAIL)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.EMAIL)).toHaveValue('bob@fake.com');
    expect(screen.getByText(Const.PASSWORD)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PASSWORD)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PASSWORD)).toHaveAttribute(
      'type',
      'password'
    );
    expect(screen.getByText(Const.GENDER)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.GENDER)).toHaveValue('male');
    expect(screen.getByText(Const.COUNTRY)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.COUNTRY)).toHaveValue('UK');
  });
});
