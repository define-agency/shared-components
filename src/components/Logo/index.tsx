import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Image, { ImageProps } from '../Image';

interface LogoProps {
  disabledLink?: boolean;
  isLogoWhite?: boolean;
  sx?: ImageProps['sx'];
}

const Logo = ({ disabledLink = false, isLogoWhite, sx }: LogoProps) => {
  const logoWhite =
    'https://frontendgroupdiag.blob.core.windows.net/websiteresource/cowrysite/brand-white.png';

  const logoBlue =
    'https://frontendgroupdiag.blob.core.windows.net/websiteresource/cowrysite/brand.png';

  const logo = isLogoWhite ? logoWhite : logoBlue;

  if (disabledLink) {
    return <Box component={Image} src={logo} alt="brand" sx={{ width: 80, ...sx }} />;
  }

  return (
    <Link to="/">
      <Box component={Image} src={logo} alt="brand" sx={{ width: 80, ...sx }} />
    </Link>
  );
};

export default Logo;
