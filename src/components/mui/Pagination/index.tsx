import { GridPagination, GridPaginationApi } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material';

export type PaginationProps = Pick<
  TablePaginationProps,
  'page' | 'onPageChange' | 'rowsPerPage' | 'className' | 'count'
>;

const Pagination = ({ count, page, onPageChange, rowsPerPage, className }: PaginationProps) => {
  const pageCount = Math.ceil(count / rowsPerPage);

  return (
    <MuiPagination
      color="primary"
      size="small"
      variant="outlined"
      shape="rounded"
      className={className}
      count={pageCount}
      siblingCount={2}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
};

const TablePagination = (props: GridPaginationApi) => {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
};

export default TablePagination;
