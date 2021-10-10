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

import styles from './Queries.module.css';

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

export const QueriesPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Typography variant="h2">Запросы</Typography>
        <Button component={Link} to="/queries/create" className={styles.create} variant="contained" size="small">
          Создать запрос
        </Button>
      </div>
      <div className={styles.filters}>
        <TextField
          className={styles.search}
          size="small"
          placeholder="Поиск по запросам"
          endAdornment={<SearchIcon />}
        />
      </div>
      <div className={styles.content}>
        {data.map(item => (
          <article className={styles.ds} key={item.id}>
            <Typography variant="body2" className={styles.dsName}>
              <DocIcon className={styles.dsIcon} />
              {item.name}
            </Typography>
            <Typography variant="body2" className={styles.dsValue}>
              <ClockIcon className={styles.clock} />
              {DateTime.fromISO(item.date).toFormat('dd.MM.yyyy')}
              <MoreHorizIcon className={styles.more} />
            </Typography>
          </article>
        ))}
      </div>
    </div>
  );
};
