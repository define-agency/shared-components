import { useState, useRef, useMemo, useEffect } from 'react';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { config } from '@/config/config';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomTextField from '../mui/TextField';
import CustomAutocomplete from '../mui/Autocomplete';
import { TextFieldProps } from '@mui/material';
import { Icons } from '../Icon/custom';

const loadScript = (src: string, position: HTMLElement | null, id: string) => {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
};

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface AddressAutocompleteProps {
  value: PlaceType | null;
  handleChange: (value: (PlaceType & { geometry: any; details: any }) | null) => void;
  textFieldProps?: TextFieldProps;
}

const AddressAutocomplete = (props: AddressAutocompleteProps) => {
  const { value, handleChange, textFieldProps } = props;

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${config.google_api_key}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 400),
    []
  );

  const fetchGeocode = (newValue: PlaceType) => {
    let geocoder: any;
    if ((window as any).google) {
      geocoder = new (window as any).google.maps.Geocoder();
    }
    geocoder.geocode({ address: newValue?.description }, (results: any, status: string) => {
      if (status === 'OK' && results[0]) {
        handleChange({ ...newValue, geometry: results[0].geometry, details: results });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);

      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <CustomAutocomplete
      id="google-map"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(_: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        fetchGeocode(newValue as PlaceType);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <CustomTextField {...params} fullWidth label="Street Address" {...textFieldProps} />
      )}
      renderOption={(props, option) => {
        const matches = option?.structured_formatting?.main_text_matched_substrings || [];

        const parts = parse(
          option?.structured_formatting?.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <Box sx={{ color: 'text.secondary' }}>
                  <Icons.markerPin />
                </Box>
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default AddressAutocomplete;
