import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import Icon from '@/components/Icon';
import CustomLinearProgress from '@/components/mui/Progress/linear';

interface UploadItemProps {
  error: boolean;
  file: File;
  progress?: number;
  handleRemoveFile: (file: File) => void;
}

const UploadItem = (props: UploadItemProps) => {
  const { error, file, progress, handleRemoveFile } = props;

  const renderFilePreview = () => {
    if (file?.type.startsWith('image')) {
      return <img width={38} height={38} alt={file?.name} src={URL.createObjectURL(file)} />;
    } else if (file?.type.includes('pdf')) {
      return <Icon icon="tabler:file-type-pdf" />;
    } else {
      return <Icon icon="tabler:file" />;
    }
  };

  return (
    <ListItem key={file?.name}>
      <Box className="file-details">
        <Box className="file-preview">{renderFilePreview()}</Box>
        <Box className="file-details-right">
          <Box className="file-details-right-top">
            <Box>
              <Typography className="file-name">{file.name}</Typography>
              <Typography className="file-size" variant="body2">
                {Math.round(file?.size / 100) / 10 > 1000
                  ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                  : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
              </Typography>
            </Box>
            <Box
              sx={{
                cursor: 'pointer',
                color: error ? 'error.600' : 'grey.600'
              }}
              onClick={() => handleRemoveFile(file)}
            >
              <Icon icon="tabler:trash" />
            </Box>
          </Box>
          {progress && <CustomLinearProgress variant="determinate" value={progress} />}
        </Box>
      </Box>
    </ListItem>
  );
};

export default UploadItem;
