'use client';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Typography,
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
      PaperProps={{ sx: { borderRadius: 2, bgcolor: '#121F28' } }}
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h5'>{data.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Type</Typography>
              <Typography color='gray' variant='subtitle2'>
                {data.type}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Responsibilities</Typography>
              {data.responsibilities.map((x, i) => (
                <Typography color='gray' variant='subtitle2' key={i}>{`• ${x}`}</Typography>
              ))}
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='secondary' onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectsDialog;
