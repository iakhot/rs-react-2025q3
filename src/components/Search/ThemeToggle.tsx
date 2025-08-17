'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './index';
import { useTranslations } from 'next-intl';

function ThemeToggle() {
  const { currentTheme, handleThemeSwitch } = useContext(ThemeContext);
  const t = useTranslations('ThemeToggle');
  return (
    <>
      <span className="switch-label fw600">{t('light')}</span>
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
      <span className="switch-label fw600">{t('dark')}</span>
    </>
  );
}

export default ThemeToggle;
