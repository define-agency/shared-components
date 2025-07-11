import Chip, { ChipProps } from '@mui/material/Chip';
import clsx from 'clsx';
import { useBgColor, UseBgColorType } from '@/hooks';

export type CustomChipProps = ChipProps & { skin?: 'light'; rounded?: boolean };

const CustomChip = (props: CustomChipProps) => {
  const { sx, skin, color, rounded, variant = 'filled' } = props;

  const bgColors = useBgColor();

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  };

  const propsToPass = { ...props };

  propsToPass.rounded = undefined;

  return (
    <Chip
      {...propsToPass}
      variant={variant}
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light'
      })}
      sx={skin === 'light' && color ? Object.assign(colors[color], sx) : sx}
    />
  );
};

export default CustomChip;
