import { Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { TextField } from 'components/TextField';
import { getDatasets } from 'services/api';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';

import styles from './QueryCreation.module.css';

const data = [
  {
    id: 1,
    name: 'Запрос 1',
    date: '2021-10-09T00:00:00'
  },
  {
    id: 2,
    name: 'Запрос 2',
    date: '2021-10-08T00:00:00'
  },
]

export const QueryCreationPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Typography variant="h2">Новый запрос</Typography>
      </div>
      <div className={styles.content}>

      </div>
    </div>
  );
};
