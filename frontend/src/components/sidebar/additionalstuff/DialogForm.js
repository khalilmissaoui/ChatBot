import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import axios from'../../../axios/axios'
export default function DialogForm({ openReport, setOpenReport }) {
  const handleCloseReport = () => {
    const reportUser = {
      content : input , 
      img : userInfo.filepreview ,
      sender :'60380e67e557ee5e0c8921f6'
    }
    axios.post('/report/add',reportUser).then( (BotAnswer)=> console.log(BotAnswer.data))
    
    setuserInfo({...userInfo,filepreview:null})

      setOpenReport(false);
  };
  const [userInfo, setuserInfo] = React.useState({
    file:[],
    filepreview:null
})
  const clearPic = () =>{
    setuserInfo({...userInfo,filepreview:null})
  }
  const handleImage = (event) =>{
    console.log(event.target.files[0]);
    setuserInfo({
        ...userInfo,file:event.target.files[0],
        filepreview: URL.createObjectURL(event.target.files[0])
    })

}

const [input, setInput] = React.useState("");



  return (
    <div>
      <Dialog
        open={openReport}
        onClose={handleCloseReport}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            To report something inside this chabot, please express here. We will
            send updates on your report occasionally.
          </DialogContentText>
          <div style={{ display: "flex", position: "relative" }}>
            <TextField
              autoFocus
              margin="dense"
              id="report"
              label="Report field"
              type="text"
              fullWidth
              onChange={(e)=>{
                console.log(e.target.value);
                setInput(e.target.value)}}
            />
            <div 
            style={{
              position: "absolute",
              right: 25,
              top: 15,
              width: 25,
              height: 25,
            }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <CameraEnhanceOutlinedIconStyled />
                </IconButton>
              </label>
            </div>
          </div>
          <div id="pics">
            {userInfo.filepreview !== null ?
            <img style={{width:'400px' , height:'300px'}} src={userInfo.filepreview} onClick={clearPic} /> :null  
          }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const CameraEnhanceOutlinedIconStyled = styled(CameraEnhanceOutlinedIcon)`
  z-index: 1;
  color: grey;
  :hover {
    color: blue;
    cursor: pointer;
  }
`;
