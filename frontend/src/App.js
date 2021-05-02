/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import axios from "./axios/axios";
import "./scss/style.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChatbotAuth from "./components/ChatbotAuth";
import ChatbotRegister from "./components/ChatbotRegister";
import Introduction from "./components/Introduction";
import Welcome from "./components/Welcome";
import { UserContext } from "./contextProvider/contextProvider";
import { useHistory } from "react-router-dom";
import QuizCategories from "./components/Quiz/QuizCategories";
import Logout from "./components/Logout"
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

const App = () => {
  const history = useHistory();

  React.useEffect(() => {
    axios.get("/getcurrentuser").then((response) => {
      setuser(response.data);
    });
  }, []);

  const [user, setuser] = React.useState();

  return (
    <div className="App">
      <div>
        <UserContext.Provider value={{ user, setuser }}>
          <Switch>
            <Route path="/admin">
              <Router>
                <React.Suspense fallback={loading}>
                  <Switch>
                    <Route
                      path="/"
                      name="Home"
                      render={(props) => <TheLayout {...props} />}
                    />
                  </Switch>
                </React.Suspense>
              </Router>
            </Route>
            <Route path="/Introduction">
              <Introduction />
            </Route>
            <Route path="/register">
              <ChatbotRegister />
            </Route>
            <Route path="/auth">
              <ChatbotAuth />
            </Route>
            <Route path="/quiz">
              <QuizCategories />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </div>
  );
};

export default App;
