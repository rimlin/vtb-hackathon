import { Button, Typography } from '@mui/material';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { TextField } from 'components/TextField';

import styles from './Datasets.module.css';

export const DatasetsPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Typography variant="h2">Датасеты</Typography>
        <Button className={styles.create} variant="contained" size="small">
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
    </div>
  );
};
