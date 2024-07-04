import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBorad.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
	X: "Player 1",
	O: "Player 2",
};
const intialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function derivedActivePlayer(gameTurns) {
	let currentPlayer = "X";

	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}
	return currentPlayer;
}

function deriveGameBoard(gameTurns) {
	let gameBoard = [...intialGameBoard.map((array) => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}
	return gameBoard;
}

function deriveWinner(gameBoard, players) {
	let winner;
	for (const combinations of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combinations[0].row][combinations[0].column];
		const secondSquareSymbol =
			gameBoard[combinations[1].row][combinations[1].column];
		const thirdSquareSymbol =
			gameBoard[combinations[2].row][combinations[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = derivedActivePlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = derivedActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];
			return updatedTurns;
		});
	}

	function handleRestart() {
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}
	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						isActive={activePlayer === "X"}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						isActive={activePlayer === "O"}
						onChangeName={handlePlayerNameChange}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} onRestart={handleRestart} />
				)}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
