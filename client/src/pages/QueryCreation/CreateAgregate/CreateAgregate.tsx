import * as React from 'react';

import { CustomModal } from 'components/CustomModal';

import agregate from './agregate.png'

import styles from './CreateAgregate.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateAgregate: React.FC<Props> = ({ open, onClose }) => {
  return (
    <CustomModal onClose={onClose} open={open} className={styles.modal}>
      <img src={agregate} alt="" onClick={() => onClose()} />
    </CustomModal>
  );
};
