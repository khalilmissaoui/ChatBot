import React from 'react'
import {fetchScenario,selectScenario} from '../../../Redux/stepsSlice'
import { useDispatch , useSelector} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import StepDetails from './StepDetails';
import axios from '../../../axios/axios'
import {addmessage,selectMessages} from '../../../Redux/chatSlice'
import {initialingData,selectquizScore} from '../../../Redux/quizslice'

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function Timeline() {
  const dispatch = useDispatch();
  const [doneSenario, setdoneSenario] = React.useState(0)
  const [activeStep, setActiveStep] = React.useState(0);

  const scenario =  useSelector(selectScenario); 
  const scores =  useSelector(selectquizScore)

  
  React.useEffect(() => {
    const fetchdata = async ()=> {const result = await axios.get('/scenario/selectedScenarioByuserId')
    console.log('result data :p ',result.data.progress);
    setActiveStep(result.data.progress)
  }
    fetchdata();
    dispatch(fetchScenario());
    }, [])

    React.useEffect(() => {
     const x = async ()=>{ 
       if(activeStep !=0){
    const updatecurrentstation =
    {
        activeStep : activeStep
    }
    console.log('activeStep',activeStep);
    const result = await axios.post('/scenario/updateProgress',updatecurrentstation)
    console.log(result.data);}}
x();
      }, [activeStep])
      const history = useHistory();
  
  const handleNext = () => {
    //Await ! ! !
    if(scores <= 5 ){
      //alert('inferieur ');
      return
    }else {
    dispatch(initialingData(0))

    console.log('this is the score from redux',scores);
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  if(activeStep === scenario.scenario_id.steps.length - 1) {
    console.log('in the end of the day everything is gonna be alright & if its not , its not')
    console.log('trigger an event**************');
    const triggerEvent = {
      msg : 'DoneScenarioNewOne'
    }
    axios.post('/changescenarioEvent',triggerEvent).then((result)=>{
      console.log(result.data);
      dispatch(addmessage(result.data));
    })
    //We will trigger an event to ask our user to choose another scenario !! then based on his answer we will change it in the backend a
    // and send him a message that we did it x
  }}
  };

  const handleBack = () => {
   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const goquiz= ()=>{
    history.push('/quiz')
  }
  const handleReset = () => {
    setActiveStep(0);
  };
    return (
        <div>
          {console.log('this is the scores ',scores)}
          <div >
            { !scenario  ?  <div>null</div> :
                (
                <>
                <Stepper activeStep={activeStep} orientation="vertical">
                {console.log(activeStep ,'  *  ', scenario.scenario_id.steps.length)}
                {scenario.scenario_id.steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>StepLabel</StepLabel>
                    <StepContent>
                      {console.log(label)}
                      <StepDetails course={label} /> 
                      <div >
                        <div>
                      
                        { scores <= 5 ?  
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={goquiz}
                          >
                            Quiz
                          </Button> :
                          <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        
                        >
                          Next
                        </Button> }
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
             {/* { (activeStep === scenario.scenario_id.steps.length) && (
                console.log('in the end of the day everything is gonna be alright & if its not , its not')
              )} */}
              </> )
            }
       
      {} 
    </div>

        
        
    </div>
    )
}

export default Timeline
