import { useState, memo } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

import CustomTextField from '../TextField';

const CustomDatePicker = ({ slots, slotProps, ...rest }: DatePickerProps<any>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: CustomTextField,
          ...slots
        }}
        slotProps={{
          ...slotProps,
          textField: {
            fullWidth: true,
            onClick: () => setIsOpen(true),
            ...slotProps?.textField
          }
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default memo(CustomDatePicker);
