import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoIcon } from 'assets/icons/logo_dark.svg';
import { ReactComponent as DatabaseIcon } from 'assets/icons/database.svg';
import { ReactComponent as StarIcon } from 'assets/icons/star.svg';
import { ReactComponent as ZapIcon } from 'assets/icons/zap.svg';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import ava from './ava.png';

import styles from './Sidenav.module.css';

export const Sidenav = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <LogoIcon />
      </div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Button
              startIcon={<DatabaseIcon />}
              component={NavLink}
              activeClassName={styles.activeItem}
              exact
              to="/"
              variant="text"
              size="medium"
              fullWidth
            >
              Датасеты
            </Button>
          </li>
          <li>
            <Button
              startIcon={<DocIcon />}
              component={NavLink}
              activeClassName={styles.activeItem}
              to="/queries"
              variant="text"
              size="medium"
              fullWidth
            >
              Запросы
            </Button>
          </li>
          <li>
            <Button
              startIcon={<ZapIcon />}
              component={NavLink}
              activeClassName={styles.activeItem}
              to="/connections"
              variant="text"
              size="medium"
              fullWidth
            >
              Подключения
            </Button>
          </li>
          <li>
            <Button
              disabled
              startIcon={<StarIcon />}
              component={NavLink}
              activeClassName={styles.activeItem}
              to="/favorites"
              variant="text"
              size="medium"
              fullWidth
            >
              Избранное
            </Button>
          </li>
        </ul>
      </nav>
      <div className={styles.user}>
        <img src={ava} alt="" />
        <div className={styles.userInfo}>
          <Typography variant="body1">Учетная запись</Typography>
          <Typography variant="body2" color="GrayText">alexanderkn</Typography>
        </div>
      </div>
    </div>
  );
};
