import Box, { BoxProps } from '@mui/material/Box';
import { Icon as IconifyIcon, IconProps } from '@iconify/react';

const Icon = ({ icon, ...rest }: BoxProps & IconProps) => {
  return <Box component={IconifyIcon} icon={icon} fontSize="1.375rem" {...rest} />;
};

export default Icon;
