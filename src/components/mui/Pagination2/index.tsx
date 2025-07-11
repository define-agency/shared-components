import Icon from '@/components/Icon';
import { useResponsive } from '@/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination, { PaginationProps } from '@mui/material/Pagination';

interface CustomPaginationProps extends PaginationProps {
  prevPageCount: number;
  nextPageCount: number;
  onPrev: () => void;
  onNext: () => void;
}

const CustomPagination = (props: CustomPaginationProps) => {
  const { onPrev, onNext, prevPageCount, nextPageCount, ...others } = props;

  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        mt: 10,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        py: 6
      }}
    >
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        endIcon={<Icon icon="tabler:arrow-narrow-left" />}
        disabled={prevPageCount < 1}
        onClick={onPrev}
      >
        Previous
      </Button>
      {lgUp && (
        <Pagination
          color="primary"
          size="small"
          variant="outlined"
          shape="rounded"
          siblingCount={1}
          boundaryCount={3}
          hidePrevButton
          hideNextButton
          {...others}
        />
      )}
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        endIcon={<Icon icon="tabler:arrow-narrow-right" />}
        disabled={nextPageCount < 1}
        onClick={onNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default CustomPagination;
