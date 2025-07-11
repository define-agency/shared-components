import { DropzoneOptions, useDropzone } from 'react-dropzone';

import List from '@mui/material/List';
import { lighten } from '@mui/material';
import Button from '@mui/material/Button';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { hexToRGBA } from '@/libs/hexToRgba';

import { DropzoneWrapper } from '@/styles/libs';

import Icon from '../Icon';
import FileUploadItem from './components/UploadItem';

interface UploadFilesProps extends DropzoneOptions {
  error: boolean;
  files: File[];
  progress?: number;
  helperText?: React.ReactNode;
  sx?: BoxProps['sx'];
  handleRemoveFile: (file: File) => void;
  handleRemoveAllFiles?: () => void;
}

const UploadFiles = (props: UploadFilesProps) => {
  const {
    error,
    files,
    progress,
    helperText,
    sx,
    handleRemoveFile,
    handleRemoveAllFiles,
    ...rest
  } = props;

  const { getRootProps, getInputProps } = useDropzone({
    // maxSize: rest?.maxSize || 2097152,
    ...rest
  });

  return (
    <DropzoneWrapper>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          ...(error && {
            borderColor: (theme) => `${lighten(theme.palette.error.main, 0.7)} !important`,
            backgroundColor: (theme) => `${hexToRGBA(theme.palette.error.main, 0.1)} !important`
          }),
          ...sx
        }}
      >
        <input {...getInputProps()} />{' '}
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            gap: 6
            // flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              color: (theme) => (error ? theme.palette.error.main : theme.palette.grey[600])
            }}
          >
            <Icon icon="mynaui:cloud-upload" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              textAlign: 'start',
              alignItems: 'flex-start',
              flexDirection: 'column'
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }} color={error ? 'error.400' : 'grey.600'}>
              Drag and drop document here or{' '}
              <Typography
                variant="caption"
                color={error ? 'error.main' : 'primary.main'}
                fontWeight={600}
                sx={{ cursor: 'pointer' }}
              >
                Browse
              </Typography>
            </Typography>
            <Typography variant="caption" color={error ? 'error.400' : 'grey.600'}>
              Supported file types: JPEG, PNG, PDF (Max size: 2mb)
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length ? (
        <>
          <List>
            {files.map((file) => (
              <FileUploadItem
                key={file?.name}
                error={error}
                file={file}
                progress={progress}
                handleRemoveFile={handleRemoveFile}
              />
            ))}
          </List>
          {files.length > 1 && handleRemoveAllFiles && (
            <div className="buttons">
              <Button color="error" variant="outlined" onClick={handleRemoveAllFiles}>
                Clear
              </Button>
            </div>
          )}
        </>
      ) : null}{' '}
      {helperText && error && (
        <Typography variant="body2" color={error ? 'error.main' : 'primary.main'}>
          {helperText}
        </Typography>
      )}
    </DropzoneWrapper>
  );
};

export default UploadFiles;
