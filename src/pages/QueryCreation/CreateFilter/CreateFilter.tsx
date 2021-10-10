import * as React from 'react';
import { Paper, ClickAwayListener, Button, CircularProgress, Typography, Divider } from '@mui/material';
import Popper from '@mui/material/Popper';

import createFilter from './createFilter.png'

import styles from './CreateFilter.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  anchorEl: any
}

export const CreateFilter: React.FC<Props> = ({ open, onClose, anchorEl }) => {
  return (

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
          <img src={createFilter} alt="" onClick={() => onClose()} />
        </div>
      </Popper>
    </ClickAwayListener>
  );
};
