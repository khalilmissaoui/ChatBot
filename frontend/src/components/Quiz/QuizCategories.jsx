import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styles, difficulties, createMarkup } from "../../helpers";
import QuizAnswers from "./QuizAnswers";

const useStyles = makeStyles((theme) => {
  return styles;
});

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });

  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });

  const [quizData, setQuizData] = useState([]);
  const classes = useStyles();

  const [currentQuizStep, setCurrentQuizStep] = useState("start");

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${10}&category=${
        18
      }&difficulty=${'easy'}`;
      const { data } = await axios.get(url);

      const formattedCategory = data.results.map((cat) => {

        const incorrectAnswersIndexes = cat.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );

        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);
        
        return {
          ...cat,
          answers: cat.incorrect_answers,
        };
      });

      setQuizData(formattedCategory);
      setCurrentQuizStep("results");
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    setCategories(data.trivia_categories);
  };

  useEffect(() => {
    fetchCategories();
    window.scrollTo(0, "20px");
  }, []);

  const handleSubmit = (e) => {
    console.log('difficulty' ,difficulty);
    console.log('category.id',category.id);
    console.log('quizNumber' ,quizNumber);
    console.log('quizNumber' ,quizData.length);


    e.preventDefault();
    
      fetchQuizData();
    
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory);
  };

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    setQuizNumber(e.target.value);
  };

  const resetQuiz = (e) => {
    e.preventDefault();
    setQuizData([]);
    setCategory("");
    setQuizNumber("");
    setDifficulty("");
    setCurrentQuizStep("start");
    window.scrollTo(0, "20px");
  };

  if (!categories.length) {
    return null;
  }

  return (
    <Container>
      <Paper className={classes.paper}>
        {currentQuizStep === "start" ? (
          <>
            
            <form onSubmit={handleSubmit}>
            <div>
              whenever you feel ready 
            </div>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Ready
              </Button>
            </form>
          </>
        ) : (
          <QuizAnswers
            classes={classes}
            quizData={quizData}
            resetQuiz={resetQuiz}
            categories={categories}
            currentQuizStep={currentQuizStep}
            setCurrentQuizStep={setCurrentQuizStep}
          />
        )}
      </Paper>
    </Container>
  );
};

export default QuizCategories;
