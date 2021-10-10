import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import { BootstrapDialogTitle, CustomModal } from 'components/CustomModal';
import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';
import { ReactComponent as BucketIcon } from 'assets/icons/parasha.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

import styles from './CreateRelation.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  datasetNames: string[];
}

export const CreateRelation: React.FC<Props> = ({ open, onClose, datasetNames }) => {
  return (
    <CustomModal onClose={onClose} open={open} className={styles.modal}>
      <BootstrapDialogTitle onClose={onClose}>Добавление связей</BootstrapDialogTitle>
      <DialogContent dividers className={styles.content}>
        <section className={styles.datasetList}>
          <Typography variant="body2" style={{ fontWeight: 700, marginBottom: 12, fontSize: '1.125rem' }}>
            Датасеты
          </Typography>
          {datasetNames.map(name => (
            <div className={styles.dataset}>
              <div className={styles.datasetName}>
                <DatabaseIcon width={16} height={16} color="#0C6DFF" />
                <Typography
                  className={styles.textEllipsis}
                  variant="body2"
                  style={{ marginLeft: 8, flexShrink: 5 }}
                >
                  {name}
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
          <div className={styles.datasetRelashionshipsList}>
            <div className={styles.datasetRelashionshipsCard}>
              <span>dataset_1 [product_id] = dataset_2 [product_id]</span>
              <BucketIcon width={16} height={16} style={{ cursor: 'pointer' }} />
            </div>
            <div className={styles.datasetRelashionshipsCard}>
              <span>dataset_1 [product_id] = dataset_2 [product_id]</span>
              <BucketIcon width={16} height={16} style={{ cursor: 'pointer' }} />
            </div>
            <div className={styles.datasetRelashionshipsCard}>
              <span>dataset_1 [product_id] = dataset_2 [product_id]</span>
              <BucketIcon width={16} height={16} style={{ cursor: 'pointer' }} />
            </div>
          </div>
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
