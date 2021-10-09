import React from 'react';

import { Sidenav } from 'components/Sidenav';

import styles from './Dashboard.module.css';

export const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.sidenav}>
        <Sidenav />
      </div>
      <div>{children}</div>
    </div>
  );
};
