'use client';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { colors } from '../styles/theme/colors';
import { IData } from './projects';

interface ProjectsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: IData;
}

const ProjectsDialog = ({ isOpen, onClose, data }: ProjectsDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth
      maxWidth={'xs'}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          bgcolor: '#121F28',
          border: `1px solid ${colors.borderHover}`,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          backgroundImage:
            'linear-gradient(135deg, rgba(255, 113, 91, 0.05) 0%, transparent 100%)',
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <DialogContentText id='alert-dialog-description'>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <Box
                component='img'
                src={data.thumbnail}
                alt={data.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: `1px solid ${colors.glow}`,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.01em',
                }}
              >
                {data.name}
              </Typography>
            </Grid>
            {data.type && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 113, 91, 0.08)',
                    border: `1px solid ${colors.glow}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: colors.tomato,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      mb: 1,
                    }}
                  >
                    Project Type
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                    }}
                  >
                    {data.type}
                  </Typography>
                </Box>
              </Grid>
            )}
            {data.responsibilities.length > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '12px',
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: colors.tomato,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      mb: 2,
                    }}
                  >
                    Responsibilities
                  </Typography>
                  {data.responsibilities.map((x, i) => (
                    <Typography
                      key={i}
                      sx={{
                        color: colors.textSecondary,
                        fontSize: '1rem',
                        mb: 1,
                        pl: 2.5,
                        position: 'relative',
                        lineHeight: 1.6,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: colors.tomato,
                        },
                      }}
                    >
                      {x}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant='contained'
          color='secondary'
          onClick={onClose}
          sx={{
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: `0 4px 12px ${colors.glow}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 20px ${colors.borderHover}`,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectsDialog;
