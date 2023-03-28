import { Link } from "react-router-dom";

export default function MultiplayerIndex() {
  return (
    <div>
      <Link to="create">Create new Room</Link>
      <Link to="">Join Room</Link>
    </div>
  );
}
