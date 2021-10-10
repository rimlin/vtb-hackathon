import { Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { TextField } from 'components/TextField';
import { getDatasets } from 'services/api';
import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';

import styles from './Datasets.module.css';

export interface Dataset {
  createDate: string;
  type: string;
  urn: string;
  name: string;
}

export const DatasetsPage = () => {
  const { isLoading, error, data } = useQuery<Dataset[]>('datasets', () => getDatasets());

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Typography variant="h2">Датасеты</Typography>
        <Button disabled className={styles.create} variant="contained" size="small">
          Создать датасет
        </Button>
      </div>
      <div className={styles.filters}>
        <TextField
          className={styles.search}
          size="small"
          placeholder="Поиск по имени и организации"
          endAdornment={<SearchIcon />}
        />
        <Button className={styles.all} variant="outlined" size="small">
          Все
        </Button>
        <Button
          className={styles.onlyMy}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Только мои
        </Button>
      </div>
      <div className={styles.content}>
        {isLoading && <CircularProgress />}
        {error && (
          <Typography variant="body2" color="error">
            Ошибка запроса
          </Typography>
        )}

        {data?.map(item => (
          <article className={styles.ds} key={item.urn}>
            <div className={styles.dsWrapper}>
              <Typography variant="body2" className={styles.dsName}>
                <DatabaseIcon />
                {item.name}
              </Typography>
              <Typography variant="body2" className={styles.dsValue}>
                Amazon
              </Typography>
              <Typography variant="body2" className={styles.dsValue}>
                alexanderkn
              </Typography>
              <Typography variant="body2" className={styles.dsValue}>
                <ClockIcon /> {DateTime.fromISO(item.createDate).toFormat('dd.MM.yyyy')}
              </Typography>
            </div>
            <Link className={styles.dsLink} to={`/dataset/${item.urn}?name=${item.name}`}></Link>
          </article>
        ))}
      </div>
    </div>
  );
};
