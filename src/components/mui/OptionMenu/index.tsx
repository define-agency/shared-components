import { MouseEvent, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Icon from '@/components/Icon';
import { OptionType, OptionsMenuType, OptionMenuItemType } from './types';

const MenuItemWrapper = ({
  children,
  option
}: {
  children: ReactNode;
  option: OptionMenuItemType;
}) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        to={option.href}
        {...option.linkProps}
        sx={{
          px: 4,
          py: 1.5,
          width: '100%',
          display: 'flex',
          gap: 3,
          color: 'inherit',
          fontSize: 14,
          alignItems: 'center',
          textDecoration: 'none'
        }}
      >
        {children}
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: 'flex', gap: 3, color: 'inherit', alignItems: 'center', fontSize: 14 }}>
        {children}
      </Box>
    );
  }
};

const OptionsMenu = (props: OptionsMenuType) => {
  const { icon, options, menuProps, iconProps, leftAlignMenu, iconButtonProps } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-haspopup="true" onClick={handleClick} {...iconButtonProps}>
        {icon ? icon : <Icon icon="tabler:dots-vertical" {...iconProps} />}
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          transformOrigin: { vertical: 'top', horizontal: 'right' }
        })}
        {...menuProps}
      >
        {options.map((option: OptionType, index: number) => {
          if (typeof option === 'string') {
            return (
              <MenuItem key={index} onClick={handleClose}>
                {option}
              </MenuItem>
            );
          } else if ('divider' in option) {
            return option.divider && <Divider key={index} {...option.dividerProps} />;
          } else {
            return (
              <MenuItem
                key={index}
                {...option.menuItemProps}
                {...(option.href && { sx: { p: 0 } })}
                onClick={(e) => {
                  handleClose();
                  option.menuItemProps && option.menuItemProps.onClick
                    ? option.menuItemProps.onClick(e as any)
                    : null;
                }}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItemWrapper>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
};

export default OptionsMenu;
