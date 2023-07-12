import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props) {
  const { userId, confirmOk, dialogOpen } = props;
  const [open, setOpen] = useState(false);


  useEffect(() => {
    console.log(' useEffect open ==', dialogOpen);
    setOpen(dialogOpen);
  }, [open]);

  const handleOk = () => {
    confirmOk(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    confirmOk(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Currently selected user is: ${userId}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check selected user before uploading a file. Do you wan to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            No
          </Button>
          <Button onClick={handleOk} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}