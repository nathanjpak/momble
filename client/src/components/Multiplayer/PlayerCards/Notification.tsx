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

  let extraText: string | undefined = undefined;
  if (data.points !== undefined) extraText = `+${data.points}pts`;
  if (data.msg && data.msg.length > 1 && data.correct === false)
    extraText = "Lost a turn!";

  return (
    <p
      className={`${bgClass} ${bgPointerClass} ${bgColorClass} whitespace-pre-line`}
      key={data.id}
    >
      {extraText !== undefined ? data.msg + "\n" + extraText : data.msg}
    </p>
  );
}
