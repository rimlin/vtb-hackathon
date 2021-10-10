import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import { BootstrapDialogTitle, CustomModal } from 'components/CustomModal';
import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';
import { ReactComponent as BucketIcon } from 'assets/icons/parasha.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Dataset } from '../../Datasets/Datasets'

import styles from './CreateRelation.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  datasets: Dataset[];
}

export const CreateRelation: React.FC<Props> = ({ open, onClose, datasets }) => {
  return (
    <CustomModal onClose={onClose} open={open} className={styles.modal}>
      <BootstrapDialogTitle onClose={onClose}>Добавление связей</BootstrapDialogTitle>
      <DialogContent dividers className={styles.content}>
        <section className={styles.datasetList}>
          <Typography variant="body2" style={{ fontWeight: 700, marginBottom: 12, fontSize: '1.125rem' }}>
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
          <Button
            className={styles.addRelashionships}
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PlusIcon />}
          >
            Добавить связь
          </Button>
          {datasets.length > 1 && (
            <div className={styles.datasetRelashionshipsList}>
              <div className={styles.datasetRelashionshipsCard}>
                <span><span style={{ fontWeight: 'bold' }}>{datasets[0].name}</span> [owner_id] = <span style={{ fontWeight: 'bold' }}>{datasets[1].name}</span> [owner_id]</span>
                <BucketIcon width={16} height={16} style={{ cursor: 'pointer' }} />
              </div>
              <div className={styles.datasetRelashionshipsCard}>
                <span><span style={{ fontWeight: 'bold' }}>{datasets[0].name}</span> [tags] = <span style={{ fontWeight: 'bold' }}>{datasets[1].name}</span> [tags]</span>
                <BucketIcon width={16} height={16} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          )}
        </section>
      </DialogContent>
      <DialogActions style={{ padding: 24 }}>
        <Button autoFocus onClick={onClose} variant='contained' color='secondary'>
          Отменить
        </Button>
        <Button style={{ marginLeft: 16 }} onClick={onClose} variant='contained'>
          Сохранить
        </Button>
      </DialogActions>
    </CustomModal>
  );
};
