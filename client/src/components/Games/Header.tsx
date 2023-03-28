import { useContext } from "react";
import { Link } from "react-router-dom";

import { SoloContext } from "../../Context";

export default function GamesHeader() {
  const { level, setLevel, streak, setStreak } = useContext(SoloContext);

  // TODO: use context to store level data
  const onChange = (event: any) => {
    if (!streak) setLevel(event.target.value);
    else if (
      window.confirm("Are you sure? Changing the level will reset your streak.")
    ) {
      setStreak(0);
      setLevel(event.target.value);
    }
  };

  return (
    <div className="w-screen flex">
      <Link to="..">Home</Link>

      <label htmlFor="level-select">Level:</label>
      <select
        name="level-select"
        id="level-select"
        value={level}
        onChange={(value) => onChange(value)}
      >
        <option value="a1">a1</option>
        <option value="a2">a2</option>
        <option value="b1">b1</option>
      </select>
      <p>Streak: {streak}</p>
    </div>
  );
}
