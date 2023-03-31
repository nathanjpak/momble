export default function MultiplayerHeader({
  game,
}: {
  game: string | undefined;
}) {
  return (
    <div>
      <div className="w-screen flex justify-center">
        <p>{game?.toUpperCase()}</p>
      </div>
    </div>
  );
}
