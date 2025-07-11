import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiContext
} from '@mui/x-data-grid';

import Icon from '@/components/Icon';

export interface TableToolbarProps {
  toggleFilters?: () => void;
}

const TableToolbar = (props: TableToolbarProps) => {
  const { toggleFilters } = props;

  const apiRef = useGridApiContext();

  return (
    <Box
      sx={{
        gap: 5,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <GridToolbarContainer />
        <GridToolbarFilterButton slotProps={{ button: { variant: 'outlined' } }} />
        <GridToolbarExport slotProps={{ button: { variant: 'outlined' } }} />
        <GridToolbarColumnsButton slotProps={{ button: { variant: 'outlined' } }} />
      </Box>
      <Box
        sx={{
          gap: 2,
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'end' },
          width: { xs: '100%', md: 'auto' }
        }}
      >
        <GridToolbarQuickFilter
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon fontSize="1.25rem" icon="tabler:search" />
                </Box>
              ),
              endAdornment: (
                <IconButton
                  size="small"
                  title="Clear"
                  aria-label="Clear"
                  onClick={() => apiRef.current.setQuickFilterValues([])}
                >
                  <Icon fontSize="1.25rem" icon="tabler:x" />
                </IconButton>
              )
            }
          }}
        />

        {toggleFilters && (
          <Tooltip title="Filter" placement="top">
            <IconButton color="primary" onClick={toggleFilters}>
              <Icon fontSize="1.5rem" icon="fluent:filter-12-filled" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default TableToolbar;
