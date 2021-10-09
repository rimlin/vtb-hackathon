import { Breadcrumbs, Button, CircularProgress, Typography, Link, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
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
  id: string;
  name: string;
  type: string;
  source: string;
  description: string;
}

function createData(id: string, name: string, type: string, source: string, description: string): Dataset {
  return { id, name, type, source, description };
}

const rows = [
  createData('analysis_calendar_days 1', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
  createData('analysis_calendar_days 2', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
  createData('analysis_calendar_days 3', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
  createData('analysis_calendar_days 4', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
  createData('analysis_calendar_days 5', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
  createData('analysis_calendar_days 6', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
  createData('analysis_calendar_days 7', 'analysis_calendar_days', 'Double', 'analysis_calendar_days int64', 'Описание'),
];

export const DatasetPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery<Dataset[]>(['datasets', id], () =>
    rows,
  );

  const breadcrumbs = [
    <Link component={RouterLink} underline="hover" key="1" color="inherit" to="/">
      Датасеты
    </Link>,
    <Typography key="3" color="text.primary">
      Название датасета
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
      {/* <div className={styles.content}>
        {isLoading && <CircularProgress />}
        {!isLoading && error && (
          <Typography variant="body2" color="error">
            Ошибка запроса
          </Typography>
        )}
      </div> */}
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ paddingLeft: '32px' }}>#</TableCell>
            <TableCell align="left">Имя</TableCell>
            <TableCell align="left">Источник поля</TableCell>
            <TableCell align="left">Тип</TableCell>
            <TableCell align="left">Описание</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((set, index) => (
            <TableRow
              key={set.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" style={{ padding: '0 24px 0 32px'}}>{index + 1}</TableCell>
              <TableCell align="left">{set.name}</TableCell>
              <TableCell align="left">{set.source}</TableCell>
              <TableCell align="left">{set.type}</TableCell>
              <TableCell align="left">{set.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
