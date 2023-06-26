import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function BestTime() {
	const [time, setTime] = useState(0);
	const [gameEndTime, setGameEndTime] = useState(0);
	const [gameBestTime, setGameBestTime] = useState(Infinity);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameEnded, setGameEnded] = useState(false);

	function resetTime() {
		setTime(0);
		setGameEndTime(0);
	}

	function startGame() {
		setGameStarted(true);
		setGameEnded(false);
	}

	function endGame() {
		setGameEnded(true);
		setGameStarted(false);
		setGameEndTime(time);
	}

	function bestTime() {
		if (gameEndTime < gameBestTime && gameEndTime !== 0) {
		  setGameBestTime(gameEndTime);
		}
	  }

	function formattedTime(timeValue) {
		if (timeValue === Infinity) {
		  return "--:--:--";
		}
		const date = new Date(timeValue * 10);
		return format(date, "mm:ss:SS");
	  }

	useEffect(() => {
		if (gameStarted) {
			resetTime();
		}
	}, [gameStarted]);

	useEffect(() => {
		bestTime();
	}, [gameEndTime]);


	useEffect(() => {
		if (gameStarted && !gameEnded) {
			const intervalId = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 10);
			// Clean up the interval on component unmount
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [gameStarted, gameEnded]);

	return (
		<>
			<section className="best-time">
				<div>
					<div>Time: {formattedTime(time)}</div>
				</div>
				<div>
					<div>Best Time: {formattedTime(gameBestTime)}</div>
				</div>
			</section>
			<button onClick={startGame} disabled={gameStarted}>
				Start Game
			</button>
			<button onClick={endGame}>End Game</button>
		</>
	);
}
