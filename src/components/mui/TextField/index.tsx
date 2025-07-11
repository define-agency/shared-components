import { forwardRef, useState } from 'react';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { hexToRGBA } from '@/libs/hexToRgba';

import Icon from '@/components/Icon';

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  alignItems: 'flex-start',
  [`& .${inputLabelClasses.root}`]: {
    transform: 'none',
    lineHeight: 1.154,
    position: 'relative',
    marginBottom: theme.spacing(1.5),
    fontSize: 14,
    fontWeight: 500,
    color: `${theme.palette.text.primary} !important`,
    '&.Mui-error': {
      color: theme.palette.error.main
    }
  },
  [`& .${inputBaseClasses.root}`]: {
    borderRadius: 8,
    backgroundColor: 'transparent !important',
    border: `1px solid ${hexToRGBA(theme.palette.customColors.main, 0.1)}`,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.shorter
    }),
    '&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover': {
      borderColor: hexToRGBA(theme.palette.customColors.main, 0.28)
    },
    '&:before, &:after': {
      display: 'none'
    },
    '&.MuiInputBase-sizeSmall': {
      borderRadius: 6
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[2],
      '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
        transform: 'translateX(4px)'
      },
      '&.MuiInputBase-colorPrimary': {
        borderColor: theme.palette.primary.main
      },
      '&.MuiInputBase-colorSecondary': {
        borderColor: theme.palette.secondary.main
      },
      '&.MuiInputBase-colorInfo': {
        borderColor: theme.palette.info.main
      },
      '&.MuiInputBase-colorSuccess': {
        borderColor: theme.palette.success.main
      },
      '&.MuiInputBase-colorWarning': {
        borderColor: theme.palette.warning.main
      },
      '&.MuiInputBase-colorError': {
        borderColor: theme.palette.error.main
      },
      '&.Mui-error': {
        borderColor: theme.palette.error.main
      }
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.action.selected} !important`
    },
    '& .MuiInputAdornment-root': {
      marginTop: '0 !important'
    }
  },
  [`& .${inputBaseClasses.input}`]: {
    color: theme.palette.text.primary,
    '&:not(textarea)': {
      padding: '15.5px 13px'
    },
    '&:not(textarea).MuiInputBase-inputSizeSmall': {
      padding: '10px 13px'
    },
    '&:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      })
    },
    // ** For Autocomplete
    '&.MuiInputBase-inputAdornedStart:not(.MuiAutocomplete-input)': {
      paddingLeft: 0
    },
    '&.MuiInputBase-inputAdornedEnd:not(.MuiAutocomplete-input)': {
      paddingRight: 0
    }
  },
  [`& .${formHelperTextClasses.root}`]: {
    lineHeight: 1.154,
    margin: theme.spacing(1, 0, 0),
    color: theme.palette.text.primary,
    fontSize: 12,
    '&.Mui-error': {
      color: theme.palette.error.main
    }
  },
  // ** For Select
  '& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus': {
    backgroundColor: 'transparent'
  },
  '& .MuiSelect-filled .MuiChip-root': {
    height: 22
  },

  // ** For Autocomplete
  [`& .${autocompleteClasses.input}`]: {
    paddingLeft: '6px !important',
    paddingTop: '10px !important',
    paddingBottom: '10px !important',
    [`&.${inputBaseClasses.sizeSmall}`]: {
      paddingLeft: '6px !important',
      paddingTop: '2.5px !important',
      paddingBottom: '2.5px !important'
    }
  },
  [`& .${autocompleteClasses.inputRoot}`]: {
    paddingTop: '15.5px !important',
    paddingLeft: '8px !important',
    paddingBottom: '15.5px !important',
    '&:not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart': {
      paddingLeft: '13px !important'
    },
    [`&.${inputBaseClasses.sizeSmall}`]: {
      paddingTop: '0px !important',
      paddingLeft: '5px !important',
      paddingBottom: '0px !important',
      '& .MuiAutocomplete-tag': {
        margin: 2,
        height: 22
      }
    }
  },

  // ** For Textarea
  [`& .${inputBaseClasses.multiline}`]: {
    padding: '15.25px 13px',
    [`&.${inputBaseClasses.sizeSmall}`]: {
      padding: '7.25px 13px'
    },
    '& textarea.MuiInputBase-inputSizeSmall:placeholder-shown': {
      overflowX: 'hidden'
    }
  },

  // ** For Date Picker
  '& + .react-datepicker__close-icon': {
    top: 11,
    '&:after': {
      fontSize: '1.6rem !important'
    }
  },

  // ** For Autofill
  '& input:-webkit-autofill': {
    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
    transition: 'background-color 9999s ease-in-out 0s',
    bordrRadius: 8
  }
}));

const CustomTextField = forwardRef((props: TextFieldProps, ref) => {
  const { size = 'small', type = 'text', InputLabelProps, InputProps, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextFieldStyled
      size={size}
      inputRef={ref}
      type={showPassword ? 'text' : type}
      variant="filled"
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      InputProps={{
        ...(type === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      fontSize="1.25rem"
                      icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                    />
                  </IconButton>
                </InputAdornment>
              )
            }
          : InputProps)
      }}
      {...rest}
    />
  );
});

export default CustomTextField;
