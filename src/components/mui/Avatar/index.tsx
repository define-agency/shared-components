import { forwardRef, Ref } from 'react';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import { lighten, useTheme } from '@mui/material/styles';
import { useBgColor, UseBgColorType } from '@/hooks';
import { ThemeColor } from '@/config/theme';

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor;
  skin?: 'filled' | 'light' | 'light-static';
};
const CustomAvatar = forwardRef((props: CustomAvatarProps, ref: Ref<any>) => {
  const { sx, src, skin, color } = props;

  const theme = useTheme();
  const bgColors: UseBgColorType = useBgColor();

  const getAvatarStyles = (
    skin: 'filled' | 'light' | 'light-static' | undefined,
    skinColor: ThemeColor
  ) => {
    let avatarStyles;

    if (skin === 'light') {
      avatarStyles = { ...bgColors[`${skinColor}Light`] };
    } else if (skin === 'light-static') {
      avatarStyles = {
        color: bgColors[`${skinColor}Light`].color,
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
      };
    } else {
      avatarStyles = { ...bgColors[`${skinColor}Filled`] };
    }

    return avatarStyles;
  };

  const colors: UseBgColorType = {
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    error: getAvatarStyles(skin, 'error'),
    warning: getAvatarStyles(skin, 'warning'),
    info: getAvatarStyles(skin, 'info')
  };

  return (
    <MuiAvatar
      ref={ref}
      {...props}
      sx={!src && skin && color ? Object.assign(colors[color], sx) : sx}
    />
  );
});

CustomAvatar.defaultProps = {
  skin: 'filled',
  color: 'primary'
};

export default CustomAvatar;
