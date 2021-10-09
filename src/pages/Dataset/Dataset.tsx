import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Typography,
  Link,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Divider
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import { Link as RouterLink, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as LetterIcon } from 'assets/icons/letter.svg';
import { ReactComponent as SharpIcon } from 'assets/icons/sharp.svg';
import { ReactComponent as NullIcon } from 'assets/icons/empty.svg';

import { TextField } from 'components/TextField';
import { getDataset } from 'services/api';

import styles from './Dataset.module.css';

export interface DatasetField {
  id: string;
  field: string;
  type: string;
  description: string;
}

const getTypeComponent = (type: string): ReactNode => {
  switch (type) {
    case 'STRING': return <div className={styles.entityType}><LetterIcon /><span>Строка</span></div>;
    case 'NULL': return <div className={styles.entityType}><NullIcon /><span>Null</span></div>;
    case 'NUMBER': return <div className={styles.entityType}><SharpIcon /><span>Дробное число</span></div>;
    case 'DATE': return <div className={styles.entityType}><CalendarIcon /><span>Дата</span></div>;
    case 'TIME': return <div className={styles.entityType}><CalendarIcon /><span>Время</span></div>;
    default: return null;
  }
}

export const DatasetPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery<DatasetField[]>(['datasets', id], () =>
    getDataset(id),
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
      <div className={styles.content}>
        {isLoading &&<div className={styles.spinner}><CircularProgress /></div>}
        {!isLoading && error && (
          <Typography variant="body2" color="error">
            Ошибка запроса
          </Typography>
        )}
        {data?.length && (
          <div className={styles.table}>
            <div className={styles.filters}>
              <div className={styles.buttons}>
                <Button variant="outlined" size="small" color="primary">
                  Поля
                </Button>
                <Button className={styles.sources} variant="outlined" size="small" color="secondary">
                  Источники
                </Button>
              </div>
              <TextField
                className={styles.search}
                size="small"
                placeholder="Имя поля"
                endAdornment={<SearchIcon />}
              />
            </div>
            <Table>
              <TableHead sx={{ '&:first-child tr': { borderTop: '1px solid rgba(224, 224, 224, 1)' } }}>
                <TableRow style={{ width: 32 }}>
                  <TableCell align="left" style={{ padding: 12,  paddingLeft: '32px', }}>#</TableCell>
                  <TableCell align="left" style={{ padding: 12 }}>Имя</TableCell>
                  <TableCell align="left" style={{ padding: 12 }}>Тип</TableCell>
                  <TableCell align="left" style={{ padding: 12 }}>Описание</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((set, index) => (
                  <TableRow
                    key={set.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" width={"5%"} style={{ paddingLeft: '32px' }}>{index + 1}</TableCell>
                    <TableCell align="left" width={"25%"}>{set.field}</TableCell>
                    <TableCell align="left" width={"20%"}>{getTypeComponent(set.type)}</TableCell>
                    <TableCell align="left" width={"50%"}>{set.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
