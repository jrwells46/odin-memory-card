function Scoreboard({ currentScore, highScore }) {
  return (
    <div className="scoreboard">
      <span>Current score: {currentScore}</span>
      <span>High score: {highScore}</span>
    </div>
  )
}

export default Scoreboard;
