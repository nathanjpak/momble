import { TNotification } from ".";

export default function Notification({ data }: { data: TNotification }) {
  const bgClass =
    "relative text-white text-center py-2 px-6 w-5/6 max-w-[10rem] min-w-[min-content] left-1/2 -translate-x-1/2 -translate-y-12";
  const bgPointerClass =
    "before:absolute before:w-0 before:h-0 before:top-full before:left-4 before:border-8 before:border-transparent";
  const bgColorClass =
    data.correct || data.points
      ? "bg-emerald-300 before:border-t-emerald-300"
      : "bg-red-300 before:border-t-red-300";

  return (
    <p className={`${bgClass} ${bgPointerClass} ${bgColorClass}`} key={data.id}>
      {data.points !== undefined ? `${data.msg} +${data.points}pts` : data.msg}
    </p>
  );
}
