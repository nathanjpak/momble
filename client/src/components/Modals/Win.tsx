import { useEffect, useRef, MutableRefObject } from "react";
import { gsap } from "gsap";

type WinProps = {
  bool: boolean;
  onEnter: () => void;
};

export default function Win({ bool, onEnter }: WinProps) {
  // Hide modal until needed
  let hidden = "";
  if (!bool) hidden = "hidden";

  const winText = useRef() as MutableRefObject<HTMLDivElement>;
  const enterMessage = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!bool) return;
    // Play animation
    const timeline = gsap.timeline({ autoRemoveChildren: true });
    timeline.fromTo(
      winText.current.children,
      {
        yPercent: -100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.01,
      }
    );
    timeline.fromTo(
      enterMessage.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
    timeline.restart();
    console.log(bool);

    // Add event listener
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      onEnter();
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [onEnter, bool]);

  const text = "You win!";
  return (
    <div
      className={`absolute ${hidden} p-4 backdrop-blur-sm bg-slate-50/[.6] z-10`}
    >
      <div
        className="flex justify-center gap-1 font-['Rowdies'] text-xl smartphone:text-2xl sm:text-4xl md:text-6xl lg:text-8xl text-yellow-400"
        ref={winText}
      >
        {text.split("").map((string, index) => {
          if (string === " ") string = "\xa0";
          return <div key={index}>{string}</div>;
        })}
      </div>
      <div className="text-center" ref={enterMessage}>
        Press Enter to restart.
      </div>
    </div>
  );
}
