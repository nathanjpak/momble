import { useContext } from "react";
import { Link } from "react-router-dom";

import { LevelContext } from "../../Context";

export default function GamesHeader() {
  const { level, setLevel } = useContext(LevelContext);

  // TODO: use context to store level data
  const onChange = (event: any) => {
    setLevel(event.target.value);
  };

  return (
    <div className="w-screen">
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
    </div>
  );
}
