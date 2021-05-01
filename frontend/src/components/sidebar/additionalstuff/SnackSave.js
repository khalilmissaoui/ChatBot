import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function SnackSave({openSlack ,setOpenSlack}) {
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));

      const classes = useStyles();
      
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSlack(false);
      };
    

      return (
        <div className={classes.root}>
          <Snackbar open={openSlack} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Course has been saved successfully !
            </Alert>
          </Snackbar>
        </div>
      );
}

export default SnackSave
