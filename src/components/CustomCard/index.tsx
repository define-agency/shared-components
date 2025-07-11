import Card, { CardProps } from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CustomCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const CustomCard = (props: CustomCardProps) => {
  const { title, subtitle, actions, children } = props;

  return (
    <Card
      sx={{
        border: 0,
        bgcolor: 'action.hover',
        p: 1
      }}
    >
      {title && (
        <CardHeader
          title={
            <Typography variant="textSm" fontWeight={700}>
              {title}
            </Typography>
          }
          subheader={
            <Typography variant="textSm" fontWeight={400}>
              {subtitle}
            </Typography>
          }
          action={actions}
          sx={{ p: 3 }}
        />
      )}
      <CardContent sx={{ px: 3 }}>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
