import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { MenuItem, Paper, Select } from '@mui/material';
import { useQuery } from 'react-query';

import { BootstrapDialogTitle, CustomModal } from 'components/CustomModal';
import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';
import { ReactComponent as BucketIcon } from 'assets/icons/parasha.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Dataset } from '../../Datasets/Datasets';
import { getDataset } from 'services/api';

import styles from './CreateRelation.module.css';
import { useState } from 'react';
import { DatasetField } from 'pages/Dataset/Dataset';
import { FieldArray, FormikProvider, useFormik } from 'formik';

interface Props {
  open: boolean;
  onClose: () => void;
  datasets: Dataset[];
}

export const CreateRelation: React.FC<Props> = ({ open, onClose, datasets }) => {
  const [showAdd, setShowAdd] = useState(false);

  const { data: currentDatasetFields } = useQuery<Record<string, DatasetField[]> | null>(
    datasets.map(item => ['datasets', item.urn]),
    () => {
      if (datasets.length > 0) {
        return Promise.all(datasets.map(item => getDataset(item.urn))).then(res => {
          const ret: any = {};

          datasets.forEach((item, index) => {
            ret[index] = res[index];
          });

          return ret;
        });
      } else {
        return {};
      }
    }
  );

  const [values, setValues] = useState<any>([])
  const [saved, setSaved] = useState<any>([])

  const onSubmit = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    setSaved((prev: any) => {
      const copy = [...prev]
      copy.push(values)

      return copy;
    });
    setValues([])
    setShowAdd(false)
  }

  console.log(saved)

  useEffect(() => {
    if (currentDatasetFields) {
      setValues(Object.values(currentDatasetFields).map(() => ('')))
    }
  }, [Object.values(currentDatasetFields || {}).length])


  return (
    <CustomModal onClose={onClose} open={open} className={styles.modal}>
      <BootstrapDialogTitle onClose={onClose}>Добавление связей</BootstrapDialogTitle>
      <DialogContent dividers className={styles.content}>
        <section className={styles.datasetList}>
          <Typography
            variant="body2"
            style={{ fontWeight: 700, marginBottom: 12, fontSize: '1.125rem' }}
          >
            Датасеты
          </Typography>
          {datasets.map(ds => (
            <div className={styles.dataset}>
              <div className={styles.datasetName}>
                <DatabaseIcon width={16} height={16} color="#0C6DFF" />
                <Typography
                  className={styles.textEllipsis}
                  variant="body2"
                  style={{ marginLeft: 8, flexShrink: 5 }}
                >
                  {ds.name}
                </Typography>
              </div>
              <BucketIcon width={16} height={16} style={{ cursor: 'pointer' }} />
            </div>
          ))}
          <div className={styles.addDataset}>
            <PlusIcon />
            <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 400 }}>
              Добавить датасет
            </Typography>
          </div>
        </section>
        <section className={styles.relashionships}>
          <Typography variant="body2" style={{ fontWeight: 700, fontSize: '1.125rem' }}>
            Связь между датасетами
          </Typography>
          {!showAdd && (
            <Button
              className={styles.addRelashionships}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<PlusIcon />}
              onClick={() => setShowAdd(true)}
            >
              Добавить связь
            </Button>
          )}
          {showAdd && (
            <Paper variant="outlined" className={styles.formWrapper}>
              <form className={styles.form} onSubmit={onSubmit}>
                {datasets.map((item, index) => (
                  <div className={styles.formVal}>
                    <div className={styles.formLabel}>
                      <DatabaseIcon width={16} height={16} color="#0C6DFF" />
                      <Typography
                        className={styles.textEllipsis}
                        variant="body2"
                        style={{ marginLeft: 8, flexShrink: 5 }}
                      >
                        {item.name}
                      </Typography>
                    </div>

                    <Select value={values[index]} onChange={(event) => {
                      setValues((prev: any) => {
                        const copy = prev.slice(0);

                        copy[index] = event.target.value;
                        return copy
                      })
                    }} size="small">
                      {currentDatasetFields &&
                        currentDatasetFields[index]?.map(item => (
                          <MenuItem value={item.field}>{item.field}</MenuItem>
                        ))}
                    </Select>
                  </div>
                ))}

                <div className={styles.formActions}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Связать
                  </Button>
                  <Button
                    onClick={() => setShowAdd(false)}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </Paper>
          )}

          {saved.length > 0 && Object.values(currentDatasetFields!).length > 0 && (
            <div className={styles.datasetRelashionshipsList}>
              {saved.map((fields: string[], fieldIndex: number) => {
                return (
                  <div className={styles.datasetRelashionshipsCard}>
                    <span>
                      {fields.map((field, index) => (
                        <>
                          <span style={{ fontWeight: 'bold' }}>{datasets[index].name}</span> [{field}]{(index+1) !== datasets.length  && ' = '}
                        </>
                      ))}
                    </span>
                    <BucketIcon onClick={() => {
                      setSaved((prev: any) => {
                        const copy = prev.slice(0)
                        copy.splice(fieldIndex, 1)

                        return copy
                      })
                    }} width={16} height={16} style={{ cursor: 'pointer' }} />
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </DialogContent>
      <DialogActions style={{ padding: 24 }}>
        <Button autoFocus onClick={onClose} variant="contained" color="secondary">
          Отменить
        </Button>
        <Button style={{ marginLeft: 16 }} onClick={onClose} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </CustomModal>
  );
};
