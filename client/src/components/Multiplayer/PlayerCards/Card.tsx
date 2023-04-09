type PlayerCardData = {
  name: string;
  points?: number;
  currentTurn: boolean;
  isUser: boolean;
  ready: boolean;
};

export default function PlayerCard({ data }: { data: PlayerCardData }) {
  return (
    <div className="flex flex-col bg-white w-1/2 place-items-center py-4">
      <p className={`${data.currentTurn ? "font-bold" : ""}`}>
        {data.isUser ? `${data.name} (You)` : data.name}
      </p>
      {data?.points !== undefined && <p>Points: {data.points}</p>}
      {data.ready ? "Ready!" : "Waiting..."}
    </div>
  );
}
