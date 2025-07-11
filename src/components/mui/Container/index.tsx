import MUIContainer, { ContainerProps } from '@mui/material/Container';

const Container = (props: ContainerProps) => {
  const { children, maxWidth = 'xl', sx } = props;

  return (
    <MUIContainer
      maxWidth={maxWidth}
      sx={{
        px: { xs: '1rem', sm: '1.5rem !important', lg: '1rem !important' },
        ...sx
      }}
    >
      {children}
    </MUIContainer>
  );
};

export default Container;
