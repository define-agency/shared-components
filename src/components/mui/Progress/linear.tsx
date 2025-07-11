import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

interface CustomLinearProgressProps extends LinearProgressProps {
  value?: number;
  position?: 'right' | 'bottom-right';
}

const CustomLinearProgress = (props: CustomLinearProgressProps) => {
  const { variant, value } = props;

  const isDeterminate = variant === 'determinate' && value;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant={variant} {...props} />
      </Box>
      {isDeterminate && (
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="textSm"
            color="grey.700"
            fontWeight={500}
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CustomLinearProgress;
