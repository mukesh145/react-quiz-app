function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        your score is {points}/{maxPoints} ({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">The highScore is {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
