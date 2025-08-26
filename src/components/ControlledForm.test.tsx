import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ControlledForm from './ControlledForm';
import { CountryValues, GenderValues } from '../common/types';
import * as Const from '../common/const';
import { setup } from '../__tests__/setupTests';

describe('ControlledForm', () => {
  it('renders fields correctly', () => {
    render(<ControlledForm />);

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
  it('validates name', async () => {
    const { ui } = setup(<ControlledForm />);
    const input = screen.getByLabelText(Const.NAME);
    expect(input).toBeInTheDocument();
    await ui.type(input, 'bob');
    expect(input).toHaveValue('bob');
    await ui.click(document.body);
    expect(
      screen.getByText(Const.ValidationErrors.NAME_CAPITAL)
    ).toBeInTheDocument();
  });
  it('validates age', async () => {
    const { ui } = setup(<ControlledForm />);
    const input = screen.getByLabelText(Const.AGE);
    expect(input).toBeInTheDocument();
    await ui.type(input, 'ten');
    expect(input).toHaveValue('ten');
    await ui.click(document.body);
    expect(
      screen.getByText(Const.ValidationErrors.AGE_NUMBER)
    ).toBeInTheDocument();
  });
  it('validates password', async () => {
    const { ui } = setup(<ControlledForm />);
    const input = screen.getByLabelText(Const.PASSWORD);
    expect(input).toBeInTheDocument();
    await ui.click(input);
    expect(input).toHaveValue('');
    await ui.click(document.body);
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_MIN)
    ).toBeInTheDocument();

    await ui.type(input, '1111');
    expect(input).toHaveValue('1111');
    await ui.click(document.body);
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_UP_LETTER)
    ).toBeInTheDocument();

    await ui.type(input, 'A');
    expect(input).toHaveValue('1111A');
    await ui.click(document.body);
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_LOW_LETTER)
    ).toBeInTheDocument();
    await ui.type(input, 'b');
    expect(input).toHaveValue('1111Ab');
    await ui.click(document.body);
    expect(
      screen.getByText(Const.ValidationErrors.PASSWORD_SPEC)
    ).toBeInTheDocument();

    await ui.type(input, '$');
    expect(input).toHaveValue('1111Ab$');
    await ui.click(document.body);
    expect(
      screen.queryByText(Const.ValidationErrors.PASSWORD_SPEC)
    ).not.toBeInTheDocument();
  });
});
