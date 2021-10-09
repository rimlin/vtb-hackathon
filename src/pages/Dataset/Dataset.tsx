import { Breadcrumbs, Button, CircularProgress, Typography, Link } from '@mui/material';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import { Link as RouterLink, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { TextField } from 'components/TextField';
import { getDataset } from 'services/api';
import { ReactComponent as DatabaseIcon } from 'assets/icons/database.svg';

import styles from './Dataset.module.css';

interface Dataset {
  createDate: string;
  dataAttributes: any;
  id: string;
  name: string;
}

export const DatasetPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery<Dataset[]>(['datasets', id], () =>
    getDataset(id)
  );

  const breadcrumbs = [
    <Link component={RouterLink} underline="hover" key="1" color="inherit" to="/">
      Датасеты
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className={styles.content}>
        {isLoading && <CircularProgress />}
        {!isLoading && error && (
          <Typography variant="body2" color="error">
            Ошибка запроса
          </Typography>
        )}
      </div>
    </div>
  );
};
