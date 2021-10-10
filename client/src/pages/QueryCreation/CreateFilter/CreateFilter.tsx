import React, {useState} from 'react';
import { Paper, ClickAwayListener, Button, CircularProgress, Typography, Divider } from '@mui/material';
import Popper from '@mui/material/Popper';

import { CustomModal } from 'components/CustomModal';

import createFilter from './createFilter.png'
import filter from './filter.png'

import styles from './CreateFilter.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  anchorEl: any
}

export const CreateFilter: React.FC<Props> = ({ open, onClose, anchorEl }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ClickAwayListener onClickAway={onClose}>
        <Popper
          open={open}
          anchorEl={anchorEl.current}
          placement="bottom-start"
          disablePortal={false}
          modifiers={[
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'preventOverflow',
              enabled: true,
              options: {
                altAxis: true,
                altBoundary: true,
                tether: true,
                rootBoundary: 'document',
                padding: 8,
              },
            },
          ]}
        >
          <div className={styles.root}>
            <img src={createFilter} alt="" onClick={() => setModalOpen(true)} />
          </div>
        </Popper>
      </ClickAwayListener>
      <CustomModal onClose={onClose} open={modalOpen} className={styles.modal}>
        <img src={filter} alt="" onClick={() => onClose()} />
      </CustomModal>
    </>
  );
};
