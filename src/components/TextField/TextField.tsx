import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useRef } from 'react';

const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #B1B5BB',
    fontSize: 16,
    width: '100%',
    padding: '16px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${theme.palette.primary.main} 0 0 0 1px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface TextFieldProps extends InputBaseProps {
  label?: string;
}

export const TextField = ({ label, className, ...other }: TextFieldProps) => {
  const htmlId = useRef('id' + Math.round(Math.random() * 1000));

  return (
    <FormControl className={className} variant="standard">
      {label && (
        <InputLabel shrink htmlFor={htmlId.current}>
          {label}
        </InputLabel>
      )}
      <CustomInput {...other} id={htmlId.current} />
    </FormControl>
  );
};
