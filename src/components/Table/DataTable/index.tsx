import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

import TableNoRows from '../TableNoRows';
import TableToolbar from '../TableToolbar';
import TablePagination from '../TablePagination';

interface DataTableProps extends Omit<DataGridProps, 'rows'> {
  tableData: any[];
  toggleFilters?: () => void;
}
const DataTable = (props: DataTableProps) => {
  const { tableData, toggleFilters, ...rest } = props;

  return (
    <DataGrid
      rowHeight={64}
      rows={tableData}
      pagination
      slots={{
        toolbar: TableToolbar,
        pagination: TablePagination,
        loadingOverlay: () => <LinearProgress />,
        noRowsOverlay: TableNoRows,
        ...rest.slots
      }}
      slotProps={{
        toolbar: {
          toggleFilters
        },
        baseButton: {
          size: 'small'
        },
        ...rest.slotProps
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10
          }
        }
      }}
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50, 75, 100]}
      {...rest}
    />
  );
};

export default DataTable;
