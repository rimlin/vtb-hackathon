import React from 'react';
import { Button } from '@mui/material';

import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';

import styles from './Auth.module.css';

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <LogoIcon />
        <Button className={styles.about} size="medium" variant="contained">
          О сервисе
        </Button>
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
