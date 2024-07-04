import { useState } from "react";

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [playerName, setPlayername] = useState(initialName);

	const [isEditing, setIsEditing] = useState(false);

	function handleEditClick() {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	function handleChange(event) {
		setPlayername(event.target.value);
	}

	let editplayerName = <span className="player-name">{playerName}</span>;

	//let btnCaption = "Edit";

	if (isEditing) {
		editplayerName = (
			<input type="text" required={playerName} onChange={handleChange} />
		);
		//btnCaption = "Save";
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{editplayerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
