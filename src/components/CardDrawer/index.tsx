import { useSettings } from '@/hooks';
import Sidebar, { SidebarProps } from '@/components/Sidebar';
import { SxProps } from '@mui/material';

interface CardDrawerProps extends SidebarProps {
  sx?: SxProps;
}

const CardDrawer = (props: CardDrawerProps) => {
  const { sx, children } = props;
  const { settings } = useSettings();

  const { skin } = settings;
  return (
    <Sidebar
      sx={{
        zIndex: 9,
        height: '100%',
        width: { xs: 300, sm: 400 },
        borderTopLeftRadius: (theme) =>
          props?.direction === 'left' ? theme.shape.borderRadius : 0,
        borderBottomLeftRadius: (theme) =>
          props?.direction === 'left' ? theme.shape.borderRadius : 0,
        borderRight: (theme) =>
          props?.direction === 'left' && skin === 'bordered'
            ? `1px solid ${theme.palette.divider}`
            : 0,
        borderLeft: (theme) =>
          props?.direction === 'right' && skin === 'bordered'
            ? `1px solid ${theme.palette.divider}`
            : 0,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Sidebar>
  );
};

export default CardDrawer;
