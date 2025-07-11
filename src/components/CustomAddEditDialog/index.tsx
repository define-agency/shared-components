import { forwardRef, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Breakpoint, Grow, styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Icon from '@/components/Icon';
import LoadingButton from '@mui/lab/LoadingButton';

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

export interface CustomAddEditDialogProps {
  open: boolean;
  handleClose: () => void;
  maxWidth?: Breakpoint;
  customCloseButton?: boolean;
  title: string;
  isLoading?: boolean;
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  children: ReactNode;
}

const CustomAddEditDialog = (props: CustomAddEditDialogProps) => {
  const {
    open,
    handleClose,
    maxWidth = 'md',
    customCloseButton = true,
    title,
    isLoading,
    form,
    onSubmit,
    children
  } = props;

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="custom-confirm-dialogs"
      aria-describedby="custom-confirm-dialogs"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 1.5,
          width: '100%',
          overflow: customCloseButton ? 'visible' : 'scroll'
        }
      }}
    >
      {customCloseButton && (
        <CustomCloseButton onClick={handleClose}>
          <Icon icon="tabler:x" fontSize="1.25rem" />
        </CustomCloseButton>
      )}
      <DialogTitle
        sx={{
          justifyContent: 'flex-start',
          bgcolor: 'action.hover',
          fontSize: 20,
          fontWeight: 700,
          borderTopLeftRadius: 9,
          borderTopRightRadius: 9,
          px: (theme) => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
          py: (theme) => [`${theme.spacing(4)} !important`]
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          gap: 4,
          alignItems: 'start',
          pb: (theme) => `${theme.spacing(10)} !important`,
          px: (theme) => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
        }}
      >
        {children}
      </DialogContent>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            Close
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            <span>Submit</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomAddEditDialog;
