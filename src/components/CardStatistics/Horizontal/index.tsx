import { CardStatsHorizontalProps } from '../types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@/components/Icon';
import CustomAvatar from '@/components/mui/Avatar';

const CardStatsHorizontal = (props: CardStatsHorizontalProps) => {
  const {
    sx,
    icon,
    stats,
    title,
    avatarSize = 42,
    iconSize = '1.625rem',
    avatarColor = 'primary'
  } = props;

  return (
    <Card sx={{ ...sx }}>
      <CardContent
        sx={{
          gap: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <Typography variant="displaySm" sx={{ mb: 0.5 }}>
            {stats}
          </Typography>
          <Typography variant="textSm">{title}</Typography>
        </Box>
        <CustomAvatar
          skin="light"
          color={avatarColor}
          sx={{ width: avatarSize, height: avatarSize }}
        >
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  );
};

export { CardStatsHorizontal };
