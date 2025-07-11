import { SxProps, Theme } from '@mui/material';
import { ThemeColor } from '@/layouts/types';

export type CardStatsSquareProps = {
  icon: string;
  stats: string | number;
  title: string;
  sx?: SxProps<Theme>;
  avatarSize?: number;
  avatarColor?: ThemeColor;
  iconSize?: number | string;
};

export type CardStatsHorizontalProps = {
  icon: string;
  stats: string | number;
  title: string;
  sx?: SxProps<Theme>;
  avatarSize?: number;
  avatarColor?: ThemeColor;
  iconSize?: number | string;
};
