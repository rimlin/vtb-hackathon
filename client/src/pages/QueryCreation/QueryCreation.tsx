import React, { useState, useRef, useEffect } from 'react'
import { Button, CircularProgress, Typography, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import classNames from 'classnames';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import RemoveIcon from '@mui/icons-material/Remove';

import { ReactComponent as BucketIcon } from 'assets/icons/parasha.svg';
import { ReactComponent as DatabaseIcon } from 'assets/icons/databaseSmall.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg';
import { TextField } from 'components/TextField';
import { getDatasets, getDataset } from 'services/api';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as LetterIcon } from 'assets/icons/letter.svg';
import { ReactComponent as SharpIcon } from 'assets/icons/sharp.svg';
import { ReactComponent as NullIcon } from 'assets/icons/empty.svg';
import { ReactComponent as CheckSquareIcon } from 'assets/icons/checkSquare.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';

import { Dataset } from '../Datasets/Datasets'
import { DatasetField } from '../Dataset/Dataset'
import { CreateRelation } from './CreateRelation'
import { SearchDatasets } from './SearchDatasets'
import { CreateField } from './CreateField'
import { CreateFilter } from './CreateFilter'

import styles from './QueryCreation.module.css';
import jsonQuery from './jsonQuery.json';
import { CreateAgregate } from './CreateAgregate';

const getTypeComponent = (type: string): React.ReactNode => {
  switch (type) {
    case 'STRING': return <LetterIcon />;
    case 'NULL': return <NullIcon />;
    case 'NUMBER': return <SharpIcon />;
    case 'DATE': return <CalendarIcon />;
    default: return <LetterIcon />;
  }
}

interface SelectedField {
  datasetUrn: string;
  item: DatasetField;
}

export const QueryCreationPage = () => {
  const { data: datasets } = useQuery<Dataset[]>('datasets', () => getDatasets());

  const [visibleCreateRelation, setVisibleCreateRelation] = useState(false)
  const [openDatasets, setOpenDatasets] = useState(true)
  const [selectedDS, setSelectedDS] = useState<string[]>([])
  const [currentDS, setCurrentDS] = useState<Dataset | null>(null)
  const [searchDS, setSearchDS] = useState('')
  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([])
  const [selectedGroupFields, setSelectedGroupFields] = useState<SelectedField[]>([])
  const history = useHistory();

  const { isLoading: currentDatasetFieldsLoading, data: currentDatasetFields } = useQuery<DatasetField[] | null>(['datasets', currentDS?.urn], () => {
    if (currentDS) {
      return getDataset(currentDS.urn)
    } else {
      return null
    }
  });

  const handleIconClick = () => {
    history.goBack();
  }

  const toggleDatasets = () => setOpenDatasets(prev => !prev)

  const onSelectField = (item: DatasetField) => {
    setSelectedFields(prev => {
      const res = prev.slice(0)
      res.push({
        datasetUrn: currentDS!.urn,
        item: item
      })

      return res;
    })
  }

  const onRemoveField = (index: number) => {
    setSelectedFields(prev => {
      const res = prev.slice(0)
      res.splice(index, 1)

      return res;
    })
  }

  const onRemoveDataset = (urn: string) => {
    if (currentDS?.urn === urn) {
      setCurrentDS(null)
    }

    setSelectedDS(prev => {
      return prev.filter(item => item !== urn);
    })
  }

  const onAddDataset = (dataset: Dataset) => {
    setSelectedDS(prev => {
      const copy = prev.slice(0)
      copy.push(dataset.urn);

      return copy;
    })
  }

  const onSettings = (index: number) => {
    setVisibleCreateAgregate(true)
  }

  const addDatasetRef = useRef<any>(null)
  const [visibleSearchDatasets, setVisibleSearchDatasets] = useState(false)

  useEffect(() => {
    if (datasets && datasets.length > 0) {
      if (selectedDS.length > 0 && !currentDS) {
        setCurrentDS(datasets.find(item => item.urn === selectedDS[0])!)
      }
    }
  }, [currentDS, datasets, selectedDS])

  const [visibleCreateField, setVisibleCreateField] = useState(false)
  const [visibleCreateAgregate, setVisibleCreateAgregate] = useState(false)

  const createFilterRef = useRef<any>(null)
  const [visibleCreateFilter, setVisibleCreateFilter] = useState(false)

  const selectGroupRef = useRef<any>(null)
  const [visibleSelectGroup, setVisibleSelectGroup] = useState(false)

  const [formedJson, setFormedJson] = useState(false)

  useEffect(() => {
    setFormedJson(false)
  }, [selectedDS?.length, selectedFields.length])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.head}>
          <Typography variant="h2"><ArrowBackIcon className={styles.arrow} onClick={handleIconClick} /> ?????????? ????????????</Typography>

          <div className={styles.actions}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
            >
              ????????????????
            </Button>
            <Button disabled variant="contained" color="primary" size="small">
              ??????????????????
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
              <Typography color="secondary" variant="body2" style={{ marginLeft: 8, color: '#737C89' }}>??????????????: </Typography>
              {currentDS && (
                <>
                  <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8, color: '#0C6DFF' }}>{currentDS?.name}</Typography>
                  {selectedDS?.length > 1 && (
                    <LinkIcon style={{ marginLeft: 'auto', paddingLeft: 8 }} fontSize="small" htmlColor="#333333" onClick={(event) => {
                      event.stopPropagation()
                      setVisibleCreateRelation(true)
                    }} />
                  )}
                </>
              )}
              {!currentDS && (
                <Typography color="gray" variant="body2" style={{ marginLeft: 8 }}>???? ????????????</Typography>
              )}
            </div>
            {openDatasets &&
              <div className={styles.datasets}>
                {datasets && datasets.filter(item => selectedDS?.includes(item.urn)).map(item => (
                  <div className={classNames(styles.datasetsItem, {
                    [styles.datasetsItemActive]: currentDS! === item
                  })}
                    onClick={() => setCurrentDS(item)}>
                    <DatabaseIcon width={16} height={16} color="#0C6DFF" />
                    <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8, flexShrink: 5 }}>{item.name}</Typography>
                    {/* <BucketIcon className={styles.datasetRemove} onClick={(event) => {
                      event.stopPropagation()
                      onRemoveDataset(item.urn)
                    }} /> */}
                  </div>
                ))}

                <div ref={addDatasetRef} className={classNames(styles.datasetsItem, styles.datasetsCreate)}
                  onClick={() => setVisibleSearchDatasets(true)}>
                  <PlusIcon color="#333" />
                  <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8 }}>???????????????? ??????????????</Typography>
                </div>
              </div>
            }

            {visibleSearchDatasets && (
              <SearchDatasets
                datasets={datasets?.filter(item => !selectedDS.includes(item.urn)) || []}
                open={visibleSearchDatasets}
                anchorEl={addDatasetRef}
                onClose={() => setVisibleSearchDatasets(false)}
                onSelect={res => {
                  onAddDataset(res);
                  setVisibleSearchDatasets(false)
                }} />
            )}

            <div className={styles.fieldsHead}>
              <FormatListBulletedIcon fontSize="small" htmlColor="rgba(115, 124, 137, 0.8)" />
              <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>???????????? ?????????? ???? ????????????????</Typography>
              <PlusIcon onClick={() => setVisibleCreateField(true)} title="???????????????? ????????" style={{ marginLeft: 'auto', cursor: 'pointer' }} color="#333" />
            </div>
            <div style={{ padding: '10px 16px 16px' }}>
              <TextField
                className={styles.search}
                size="small"
                placeholder="?????????? ???? ????????????????"
                endAdornment={<SearchIcon />}
                value={searchDS}
                onChange={(event) => setSearchDS(event.target.value)}
              />
            </div>

            {currentDatasetFieldsLoading && <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>}
            {currentDatasetFields!?.filter(item => {
              if (selectedFields.find(found => found.item.field === item.field && found.datasetUrn === currentDS?.urn)) {
                return false
              }

              return item.field?.toLowerCase().includes(searchDS.toLowerCase())
            }).map(item => (
              <div className={styles.datasetField}
                onClick={() => { }}>
                <div className={styles.datasetFieldType}>
                  {getTypeComponent(item.type)}
                </div>
                <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8 }}>{item.field}</Typography>
                <PlusIcon onClick={() => onSelectField(item)} className={styles.datasetFieldPlus} color="#333" />
              </div>
            ))}
          </section>

          {selectedDS.length > 0 && (
            <section className={styles.selected}>
              <div className={styles.colHead}>
                <CheckSquareIcon color="rgba(115, 124, 137, 0.8)" />
                <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>?????????????????? ????????</Typography>
              </div>
              <div ref={selectGroupRef} className={styles.selectedHead}>
                <CopyIcon color="rgba(115, 124, 137, 0.8)" />
                <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>?????????????????????? ???? ????????</Typography>
                <PlusIcon onClick={() => setVisibleSelectGroup(true)} title="?????????????? ???????? ?????? ??????????????????????" style={{ marginLeft: 'auto', cursor: 'pointer' }} color="#333" />
              </div>
              <Divider style={{ margin: '8px 16px'}} light />

              {selectedFields.map((item, index) => (
                <div className={styles.datasetField}>
                  <div className={styles.datasetFieldType}>
                    {getTypeComponent(item.item.type)}
                  </div>
                  <Typography className={styles.textEllipsis} variant="body2" style={{ marginLeft: 8 }}>{item.item.field}</Typography>
                  <div className={styles.datasetFieldActions}>
                    <SettingsIcon onClick={() => onSettings(index)} color="#333" />
                    <RemoveIcon onClick={() => onRemoveField(index)} htmlColor="#333" />
                  </div>
                </div>
              ))}

              {selectedFields.length === 0 && (
                <Typography variant="body1" color="gray" style={{ margin: '13px 16px', textAlign: 'center', fontSize: 14 }}>???????????????? ????????</Typography>
              )}
              <Divider light />
              <div ref={createFilterRef} className={styles.selectedHead}>
                <FilterIcon color="rgba(115, 124, 137, 0.8)" />
                <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>??????????????</Typography>
                <PlusIcon onClick={() => setVisibleCreateFilter(true)} title="???????????????? ????????????" style={{ marginLeft: 'auto', cursor: 'pointer' }} color="#333" />
              </div>
              <Divider light />
            </section>
          )}

          {selectedDS.length > 0 && (
            <section>
              <div className={styles.colHead}>
                <DocumentIcon color="rgba(115, 124, 137, 0.8)" />
                <Typography variant="body2" style={{ marginLeft: 8, fontWeight: 500 }}>????????????</Typography>
              </div>

              {formedJson ? (
                <pre className={styles.formedJson} dangerouslySetInnerHTML={{
                  __html: JSON.stringify(jsonQuery, null, 2),
                }} />
              ) : (
                <div className={styles.formJson}>
                  <Button onClick={() => setFormedJson(true)} variant="contained" color="primary" startIcon={<PlusIcon />}>???????????????????????? ????????????</Button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <CreateRelation
        datasets={datasets?.filter(item => selectedDS.includes(item.urn)) || []}
        open={visibleCreateRelation}
        onClose={() => setVisibleCreateRelation(false)} />

      <CreateField open={visibleCreateField} onClose={() => setVisibleCreateField(false)} />
      <CreateAgregate open={visibleCreateAgregate} onClose={() => setVisibleCreateAgregate(false)} />
      {visibleCreateFilter && (
        <CreateFilter anchorEl={createFilterRef} open={visibleCreateFilter} onClose={() => setVisibleCreateFilter(false)} />
      )}
      {visibleSelectGroup && (
        <CreateFilter anchorEl={selectGroupRef} open={visibleSelectGroup} onClose={() => setVisibleSelectGroup(false)} />
      )}
    </>
  );
};
