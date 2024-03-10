function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2> Welcome to the React Quiz</h2>
      <h3>{numQuestions} question to your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Lets Start
      </button>
    </div>
  );
}

export default StartScreen;
