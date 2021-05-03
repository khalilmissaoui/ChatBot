import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../../axios/axios'
export default function ForgetPasswordDialog({open , setOpen}) {
 
    const [input, setInput] = React.useState("");

  const handleClose = async (e) => {
      const email = {
          email : input
      } 
      console.log(email);
   // await axios.post('/login/forgot',email)
    setOpen(false);
  };
//open
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Reset your password , please enter your email address here. We will send you an Email to verify 
            and continue the process with You .  
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e)=>{
                console.log(e.target.value);
                setInput(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
