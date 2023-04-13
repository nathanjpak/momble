import { Link, useNavigate } from "react-router-dom";

export default function MultiplayerHeader({
  game,
}: {
  game: string | undefined;
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-screen flex justify-between">
        <text className="cursor-pointer" onClick={() => navigate(-1)}>
          Go back
        </text>
        <Link to="../..">Momble</Link>
        <p className="self-center">{game?.toUpperCase()}</p>
      </div>
    </div>
  );
}
