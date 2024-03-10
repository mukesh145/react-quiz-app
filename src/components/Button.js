function Button({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;

  if (answer !== null && index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "displayResult" })}
      >
        Finish
      </button>
    );
  }
  if (answer !== null) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
}

export default Button;
