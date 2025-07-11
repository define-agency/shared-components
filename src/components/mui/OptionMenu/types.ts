import { ReactNode } from 'react';
import { MenuProps } from '@mui/material/Menu';
import { DividerProps } from '@mui/material/Divider';
import { MenuItemProps } from '@mui/material/MenuItem';
import { IconButtonProps } from '@mui/material/IconButton';
import { IconProps } from '@iconify/react';
import { LinkProps } from 'react-router-dom';
import { BoxProps } from '@mui/material';

export type OptionDividerType = {
  divider: boolean;
  dividerProps?: DividerProps;
  href?: never;
  icon?: never;
  text?: never;
  linkProps?: never;
  menuItemProps?: never;
};
export type OptionMenuItemType = {
  text: ReactNode;
  icon?: ReactNode;
  linkProps?: LinkProps;
  href?: LinkProps['to'];
  menuItemProps?: MenuItemProps;
  divider?: never;
  dividerProps?: never;
};

export type OptionType = string | OptionDividerType | OptionMenuItemType;

export type OptionsMenuType = {
  icon?: ReactNode;
  options: OptionType[];
  leftAlignMenu?: boolean;
  iconButtonProps?: IconButtonProps;
  iconProps?: Omit<IconProps, 'icon'> & BoxProps;
  menuProps?: Omit<MenuProps, 'open'>;
};
