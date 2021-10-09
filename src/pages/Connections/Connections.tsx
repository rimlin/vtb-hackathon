import { Button, CircularProgress, Typography, Paper } from '@mui/material';

import datahub from 'assets/images/datahub.jpg'
import cassandra from 'assets/images/cassandra.jpg'
import hbase from 'assets/images/hbase.jpg'
import mongo_db from 'assets/images/mongo_db.jpg'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { TextField } from 'components/TextField';

import styles from './Connections.module.css';

export const ConnectionsPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Typography variant="h2">Новое подключение</Typography>
      </div>
      <div className={styles.filters}>
        <TextField
          className={styles.search}
          size="small"
          placeholder="Поиск по названию"
          endAdornment={<SearchIcon />}
        />
      </div>
      <div className={styles.content}>
        <Paper className={styles.card} variant="outlined">
          <img src={datahub} alt="" />
          <Typography className={styles.cardLabel} variant="body1">Datahub</Typography>
        </Paper>
        <Paper className={styles.card} variant="outlined">
          <img src={cassandra} alt="" />
          <Typography className={styles.cardLabel} variant="body1">Cassandra</Typography>
        </Paper>
        <Paper className={styles.card} variant="outlined">
          <img src={hbase} alt="" />
          <Typography className={styles.cardLabel} variant="body1">HBase</Typography>
        </Paper>
        <Paper className={styles.card} variant="outlined">
          <img src={mongo_db} alt="" />
          <Typography className={styles.cardLabel} variant="body1">MongoDB</Typography>
        </Paper>
      </div>
    </div>
  );
};
