import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UncontrolledForm from './UncontrolledForm';
import { CountryValues, GenderValues } from '../common/types';
import * as Const from '../common/const';
import { setup } from '../__tests__/setupTests';

describe('UncontrolledForm', () => {
  it('renders fields correctly', () => {
    render(<UncontrolledForm />);

    expect(screen.getByText(Const.NAME)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.NAME)).toHaveRole('textbox');
    expect(screen.getByText(Const.AGE)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.AGE)).toHaveRole('textbox');
    expect(screen.getByText(Const.EMAIL)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.EMAIL)).toHaveRole('textbox');
    expect(screen.getByText(Const.PASSWORD)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PASSWORD)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PASSWORD)).toHaveAttribute(
      'type',
      'password'
    );
    expect(screen.getByText(Const.PASSWORDCONF)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PASSWORDCONF)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PASSWORDCONF)).toHaveAttribute(
      'type',
      'password'
    );
    expect(screen.getByText(Const.GENDER)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.GENDER)).toBeInTheDocument();
    for (const gen of GenderValues) {
      expect(screen.getByText(gen)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('radio')).toHaveLength(3);

    expect(screen.getByText(Const.PICTURE)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.PICTURE)).toHaveAttribute(
      'type',
      'file'
    );
    expect(screen.getByText(Const.COUNTRY)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.COUNTRY)).toBeInTheDocument();
    for (const country of CountryValues) {
      expect(screen.getByText(country)).toBeInTheDocument();
    }

    expect(screen.getByText(Const.ACCEPT)).toBeInTheDocument();
    expect(screen.getByLabelText(Const.ACCEPT)).toHaveRole('checkbox');
  });
  it('validates password', async () => {
    const { ui } = setup(<UncontrolledForm />);
    const input = screen.getByLabelText(Const.PASSWORD);
    const submit = screen.getByRole('button', { name: /submit/i });
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    await ui.click(input);
    expect(input).toHaveValue('');

    await ui.click(submit);

    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_MIN, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_LOW_LETTER, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_UP_LETTER, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_NUM, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_SPEC, {
        exact: false,
      })
    ).toBeInTheDocument();
  });
  it('passes correct password', async () => {
    const { ui } = setup(<UncontrolledForm />);
    const input = screen.getByLabelText(Const.PASSWORD);
    const submit = screen.getByRole('button', { name: /submit/i });
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    await ui.type(input, '1aA$');
    expect(input).toHaveValue('1aA$');

    await ui.click(submit);

    expect(
      screen.queryByTestId(`${Const.PASSWORD}-error`)
    ).not.toBeInTheDocument();
  });
});
