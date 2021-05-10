import { Button, Typography } from "@material-ui/core";
import AnswersReview from "./AnswersReview";
import { useEffect } from "react";
import React from "react";
import axios from '../../axios/axios'
import { useHistory } from "react-router-dom";

import {initialingData,selectquizScore} from '../../Redux/quizslice'
import { useDispatch , useSelector} from 'react-redux'

const TotalResults = ({
  classes,
  resetQuiz,
  currentQuizStep,
  processedAnswers,
  setCurrentQuizStep,
}) => {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('final reuslt');
    window.scrollTo(0, "20px");
  }, []);
  const scores =  useSelector(selectquizScore)
  const goback = async ()=>{
    const right = processedAnswers.filter(({ isCorrect }) => isCorrect).length
    console.log(right);
    dispatch(initialingData(8))
    history.push('/')



  }

  return currentQuizStep === "results" ? (
    <div className={classes.results}>
      <Typography variant="h1" className={classes.mainTitle}>
        Results
      </Typography>
      <Typography variant="h4">
        {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}
        {processedAnswers.length}
      </Typography>
      <Button
        onClick={(e) => {
          setCurrentQuizStep("review");
        }}
        className={classes.submitButton}
        variant="contained"
        color="primary"
      >
        Review
      </Button>{" "}
      <Button
        onClick={resetQuiz}
        className={classes.submitButton}
        variant="contained"
        color="primary"
      >
        Reset
      </Button>
      <Button
        onClick={goback}
        className={classes.submitButton}
        variant="contained"
        color="primary"
      >
       Home
      </Button>
    </div>
  ) : (
    <AnswersReview
      classes={classes}
      resetQuiz={resetQuiz}
      processedAnswers={processedAnswers}
    />
  );
};

export default TotalResults;
