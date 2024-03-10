import { useEffect, useReducer } from "react";
import Header from "./header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Options from "./Options";
import Button from "./Button";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "displayResult":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };
    case "Restart":
      return { ...state, status: "ready", index: 0, points: 0, answer: null };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ index, status, questions, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  let maxPoints = 0;

  questions.forEach((question) => {
    maxPoints += question.points;
  });

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (e) {
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}

        {status === "active" && (
          <Question>
            <div>
              <Progress
                index={index}
                numQuestions={questions.length}
                points={points}
                maxPoints={maxPoints}
                answer={answer}
              ></Progress>
              <h4>{questions[index].question}</h4>
              <Options
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Button
                answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestions={questions.length}
              />
            </div>
          </Question>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
