import { TNotification } from ".";
import Notification from "./Notification";

type PlayerCardData = {
  name: string;
  id: string;
  points?: number;
  currentTurn: boolean;
  isUser: boolean;
  ready: boolean;
  notifications: Array<TNotification>;
};

export default function PlayerCard({ data }: { data: PlayerCardData }) {
  return (
    <div className="relative flex flex-col bg-white w-1/2 place-items-center py-4">
      <div className="absolute flex w-full">
        {data.notifications.map((val) => {
          if (val.authorId !== data.id) return;

          return <Notification data={val} />;
        })}
      </div>
      <p className={`${data.currentTurn ? "font-bold" : ""}`}>
        {data.isUser ? `${data.name} (You)` : data.name}
      </p>
      {data?.points !== undefined && <p>Points: {data.points}</p>}
      {data.ready ? "Ready!" : "Waiting..."}
    </div>
  );
}
