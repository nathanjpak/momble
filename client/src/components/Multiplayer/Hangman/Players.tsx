export default function Players({
  name,
  points,
  currentTurn,
  ready,
}: {
  name: string;
  points: number;
  currentTurn: boolean;
  ready: boolean;
}) {
  return (
    <div>
      <p className={`${currentTurn ? "font-bold" : ""}`}>{name}</p>
      <p>Points: {points}</p>
      {ready ? "Ready!" : "Waiting..."}
    </div>
  );
}
