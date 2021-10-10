import React, { useState } from 'react'
import { Paper, ClickAwayListener, Button, CircularProgress, Typography, Divider } from '@mui/material';
import Popper from '@mui/material/Popper';

import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';
import { Dataset } from 'pages/Datasets/Datasets';
import { TextField } from 'components/TextField';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import styles from './SearchDatasets.module.css';

interface Props {
  datasets: Dataset[];
  open: boolean
  anchorEl: any
  onClose: () => void
  onSelect: (item: Dataset) => void
}

export const SearchDatasets = ({ datasets, open, anchorEl, onClose, onSelect }: Props) => {
  const [searchDS, setSearchDS] = useState('')

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
        <Paper className={styles.root}>
          <div className={styles.head}>
            <TextField
              className={styles.search}
              size="small"
              placeholder="Поиск по названию"
              endAdornment={<SearchIcon />}
              value={searchDS}
              onChange={(event) => setSearchDS(event.target.value)}
            />
          </div>

          <div className={styles.datasets}>
            {datasets.filter(item => {
              return item.name?.toLowerCase().includes(searchDS.toLowerCase())
            }).map(item => (
              <div className={styles.datasetsItem} onClick={() => onSelect(item)}>
                <DatabaseIcon width={16} height={16} />
                <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8, flexShrink: 5 }}>{item.name}</Typography>
              </div>
            ))}
          </div>
        </Paper>
      </Popper>
    </ClickAwayListener>
  )
}
