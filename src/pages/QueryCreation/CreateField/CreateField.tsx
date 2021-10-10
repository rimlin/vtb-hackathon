import * as React from 'react';

import { CustomModal } from 'components/CustomModal';

import createfield from './createfield.png'

import styles from './CreateField.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateField: React.FC<Props> = ({ open, onClose }) => {
  return (
    <CustomModal onClose={onClose} open={open} className={styles.modal}>
      <img src={createfield} alt="" onClick={() => onClose()} />
    </CustomModal>
  );
};
