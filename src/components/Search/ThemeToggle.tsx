import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function ThemeToggle() {
  const { currentTheme, handleThemeSwitch } = useContext(ThemeContext);

  return (
    <>
      <span className="switch-label fw600">Light</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={currentTheme === 'dark'}
          onChange={() =>
            handleThemeSwitch(currentTheme === 'dark' ? 'light' : 'dark')
          }
        />
        <span className="slider round"></span>
      </label>
      <span className="switch-label fw600">Dark</span>
    </>
  );
}

export default ThemeToggle;
