import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function BestTime() {
	const [time, setTime] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameEnded, setGameEnded] = useState(false);

	function resetTime() {
		setTime(0);
	}

	function startGame() {
		setGameStarted(true);
		setGameEnded(false);
		resetTime();
	}

	function endGame() {
		setGameEnded(true);
		setGameStarted(false);
		// handleGameEnd(time);
	}

	const formattedTime = (timeValue) => {
		const date = new Date(timeValue * 10);
		return format(date, "mm:ss:SS");
	};

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
					{/* <div>Best Time: {bestTime ? formattedTime(bestTime) : "N/A"}</div> */}
					<div>Best Time: 00:00:00</div>
				</div>
			</section>
			<button onClick={startGame} disabled={gameStarted}>
				Start Game
			</button>
			<button onClick={endGame}>End Game</button>
		</>
	);
}
