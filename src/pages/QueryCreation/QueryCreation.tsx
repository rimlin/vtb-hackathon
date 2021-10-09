import React, { useState } from 'react'
import { Button, CircularProgress, Typography, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import classNames from 'classnames';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useQuery } from 'react-query';

import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg';
import { TextField } from 'components/TextField';
import { getDatasets } from 'services/api';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as LetterIcon } from 'assets/icons/letter.svg';
import { ReactComponent as SharpIcon } from 'assets/icons/sharp.svg';
import { ReactComponent as NullIcon } from 'assets/icons/empty.svg';
import { ReactComponent as CheckSquareIcon } from 'assets/icons/checkSquare.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { getDataset } from 'services/api';

import { Dataset } from '../Datasets/Datasets'

import styles from './QueryCreation.module.css';

const getTypeComponent = (type: string): React.ReactNode => {
  switch (type) {
    case 'STRING': return <LetterIcon />;
    case 'NULL': return <NullIcon />;
    case 'NUMBER': return <SharpIcon />;
    case 'DATE': return <CalendarIcon />;
    default: return null;
  }
}

const fields = [{ "field": "aggregation_method_wvvw_big_string", "type": "STRING", "description": "Aggregation period used to compute this metric" }, { "field": "date", "type": "DATE", "description": "Date of the data" }, { "field": "version", "type": "STRING", "description": "Version of the table" }, { "field": "airport_name", "type": "STRING", "description": "Aggregation period used to compute this metric" }, { "field": "percent_of_baseline", "type": "NUMBER", "description": "Proportion of trips on this date as compared to Avg number of trips on the same day of week in baseline period i.e 1st February 2020 - 15th March 2020" }, { "field": "center_point_geom", "type": "NULL", "description": "Geographic representation of the centroid of the Airport polygon" }, { "field": "city", "type": "STRING", "description": "City within which the Airport is located" }, { "field": "state_region", "type": "STRING", "description": "State within which the Airport is located" }, { "field": "country_iso_code_2", "type": "STRING", "description": "ISO 3166-2 code representing the county and subdivision within which the Airport is located" }, { "field": "country_name", "type": "STRING", "description": "Full text name of the country within which the Airport is located" }, { "field": "airport_geom", "type": "NULL", "description": "Geographic representation of the Airport polygon" }]

const datasets: Dataset[] = [
  {
    type: '1',
    name: 'Наименование датасета большого названия 1',
    createDate: '',
    urn: '',
  },
  {
    type: '2',
    name: 'Наименование датасета 2',
    createDate: '',
    urn: '',
  },
]

interface SelectedField {
  dataset: Dataset;
  field: string;
}

export const QueryCreationPage = () => {
  const { isLoading, error, data: datasets } = useQuery<Dataset[]>('datasets', () => getDatasets());

  const [openDatasets, setOpenDatasets] = useState(true)
  const [currentDS, setCurrentDS] = useState<Dataset | null>(null)
  const [searchDS, setSearchDS] = useState('')
  const [selectedFields, setSelectedFields] = useState<SelectedField[] | null>(null)

  const toggleDatasets = () => setOpenDatasets(prev => !prev)

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Typography variant="h2"><ArrowBackIcon /> Новый запрос</Typography>

        <div className={styles.actions}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
          >
            Отменить
          </Button>
          <Button disabled variant="contained" color="primary" size="small">
            Сохранить
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <section className={styles.source}>
          <div onClick={toggleDatasets} style={{ cursor: 'pointer' }} className={styles.colHead}>
            {openDatasets && (
              <KeyboardArrowUpIcon style={{ width: 16 }} htmlColor="rgba(115, 124, 137, 0.8)" />
            )}
            {!openDatasets && (
              <KeyboardArrowDownIcon style={{ width: 16 }} htmlColor="rgba(115, 124, 137, 0.8)" />
            )}
            <Typography color="secondary" variant="body2" style={{ marginLeft: 8, color: '#737C89' }}>Датасет: </Typography>
            <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8, color: '#0C6DFF' }}>{currentDS?.name}</Typography>
          </div>
          {openDatasets &&
            <div className={styles.datasets}>
              {datasets.map(item => (
                <div className={classNames(styles.datasetsItem, {
                  [styles.datasetsItemActive]: currentDS === item
                })}
                  onClick={() => setCurrentDS(item)}>
                  <DatabaseIcon width={16} height={16} color="#0C6DFF" />
                  <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8, flexShrink: 5 }}>{item.name}</Typography>
                </div>
              ))}

              <div className={classNames(styles.datasetsItem, styles.datasetsCreate)}
                onClick={() => { }}>
                <PlusIcon color="#333" />
                <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8 }}>Добавить датасет</Typography>
              </div>
            </div>
          }

          <div className={styles.fieldsHead}>
            <FormatListBulletedIcon fontSize="small" htmlColor="rgba(115, 124, 137, 0.8)" />
            <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>Список полей из датасета</Typography>
          </div>
          <div style={{ padding: '10px 16px 16px' }}>
            <TextField
              className={styles.search}
              size="small"
              placeholder="Поиск по названию"
              endAdornment={<SearchIcon />}
              value={searchDS}
              onChange={(event) => setSearchDS(event.target.value)}
            />
          </div>
          <div className={classNames(styles.datasetsItem, styles.datasetsCreate)}
            onClick={() => { }}>
            <PlusIcon color="#333" />
            <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8 }}>Добавить поле</Typography>
          </div>

          {fields.filter(item => item.field?.toLowerCase().includes(searchDS.toLowerCase())).map(item => (
            <div className={styles.datasetField}
              onClick={() => { }}>
              <div className={styles.datasetFieldType}>
                {getTypeComponent(item.type)}
              </div>
              <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8 }}>{item.field}</Typography>
              <PlusIcon className={styles.datasetFieldPlus} color="#333" />
            </div>
          ))}

        </section>
        <section className={styles.selected}>
          <div className={styles.colHead}>
            <CheckSquareIcon color="rgba(115, 124, 137, 0.8)" />
            <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>Выбранные поля</Typography>
          </div>
          <div className={styles.selectedHead}>
            <CopyIcon color="rgba(115, 124, 137, 0.8)" />
            <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>Группировка по полю</Typography>
          </div>
          <Button size="small" fullWidth className={styles.selectGroup} startIcon={<PlusIcon />}>Выбрать поле для группировки</Button>
          <Divider style={{ margin: '8px 16px'}} light />


        </section>
      </div>
    </div>
  );
};
