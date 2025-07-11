import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';

const Pagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      size="small"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      siblingCount={2}
      // @ts-expect-error style prop is not recognized by PaginationItem
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(_: React.ChangeEvent<unknown>, value: number) => apiRef.current.setPage(value - 1)}
    />
  );
};

const TablePagination = () => {
  return <GridPagination ActionsComponent={Pagination} />;
};

export default TablePagination;
