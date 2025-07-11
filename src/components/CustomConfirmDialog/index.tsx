import { ReactNode, forwardRef } from 'react';
import { Grow, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CustomAvatar, { CustomAvatarProps } from '../mui/Avatar';
import Icon from '@/components/Icon';
import { TransitionProps } from '@mui/material/transitions';

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(0px, -50px)',
  backgroundColor: `${theme.palette.background.paper} !important`,
  border: `1px solid ${theme.palette.divider} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(0px, -45px)'
  }
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export interface CustomConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  icon: string;
  avatarProps?: CustomAvatarProps;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const CustomConfirmDialog = (props: CustomConfirmDialogProps) => {
  const { open, handleClose, icon, avatarProps, title, subtitle, actions } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="custom-confirm-dialogs"
      aria-describedby="custom-confirm-dialogs"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 1.5,
          width: '100%',
          overflow: 'visible'
        }
      }}
    >
      <CustomCloseButton onClick={handleClose}>
        <Icon icon="tabler:x" fontSize="1.25rem" />
      </CustomCloseButton>
      <DialogContent
        sx={{
          display: 'flex',
          gap: 4,
          alignItems: 'start',
          pb: (theme) => `${theme.spacing(10)} !important`,
          px: (theme) => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
        }}
      >
        <CustomAvatar skin="light" {...avatarProps}>
          <Icon icon={icon} />
        </CustomAvatar>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'start',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography variant="textLg" color="text.primary" fontWeight={600}>
            {title}
          </Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'flex-end',
          bgcolor: 'action.hover',
          borderBottomLeftRadius: 9,
          borderBottomRightRadius: 9,
          px: (theme) => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
          py: (theme) => [`${theme.spacing(4)} !important`, `${theme.spacing(5)} !important`]
        }}
      >
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialog;
