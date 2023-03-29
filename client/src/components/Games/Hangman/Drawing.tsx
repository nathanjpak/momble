import { getRandNumbers } from "../../../util/functions";

// individual parts of the drawing

const head = (
  <div
    key={"head"}
    className="absolute right-1/4 translate-x-1/2 h-1/6 aspect-square rounded-full border-10 border-black"
    style={{ top: "calc(12.5% + 0.5rem)" }}
  />
);

const body = (
  <div
    key={"body"}
    className="absolute h-3/8 border-x-5 border-black"
    style={{ right: "calc(25% - 5px)", top: "29.16666667%" }}
  />
);

const rightArm = (
  <div
    key="rightArm"
    className="absolute top-3/8 rotate-30 origin-top-right border-l-10 border-black h-1/4"
    style={{ right: "calc(25% - 5px)" }}
  />
);

const leftArm = (
  <div
    key="leftArm"
    className="absolute top-3/8 -rotate-30 origin-top-left border-l-10 border-black h-1/4"
    style={{ left: "calc(75% - 5px)" }}
  />
);

const rightLeg = (
  <div
    key="rightLeg"
    className="absolute top-2/3 rotate-30 origin-top-right border-l-10 border-black h-1/4"
    style={{ right: "calc(25% - 5px)" }}
  />
);

const leftLeg = (
  <div
    key="leftLeg"
    className="absolute top-2/3 -rotate-30 origin-top-left border-l-10 border-black h-1/4"
    style={{ left: "calc(75% - 5px)" }}
  />
);

const bodyPartsArray = [head, body, rightArm, leftArm, rightLeg, leftLeg];

const mustache = (
  <div key="mustache">
    <div className="absolute right-1/4 top-1/4 h-1/32 rounded-mustache-left aspect-square bg-black rotate-30 origin-top-right z-10" />
    <div className="absolute left-3/4 top-1/4 h-1/32 rounded-mustache-right aspect-square bg-black -rotate-30 origin-top-left z-10" />
  </div>
);

const glasses = (
  <div key="glasses">
    <div
      className="absolute h-1/16 aspect-square rounded-full border-2 border-slate-700 bg-white/[0.2]"
      style={{ top: "calc(16% + 0.5rem)", right: "calc(25% + 0.125rem)" }}
    />
    <div
      className="absolute w-[0.5rem] border-t-2 border-slate-700"
      style={{ top: "calc(16% + 1rem)", right: "calc(25% - 0.25rem)" }}
    />
    <div
      className="absolute h-1/16 aspect-square rounded-full border-2 border-slate-700 bg-white/[0.2]"
      style={{ top: "calc(16% + 0.5rem)", left: "calc(75% + 0.125rem)" }}
    />
  </div>
);

const bowtie = (
  <div key="bowtie">
    <div
      className="absolute top-3/8 h-1/32 aspect-square rounded-full bg-red-500 translate-x-1/2 -translate-y-1/2"
      style={{ right: "calc(25%)" }}
    />
    <div
      className="absolute top-3/8 h-1/16 aspect-square rounded-bowtie bg-red-500 rotate-45 origin-top-right"
      style={{ right: "calc(25%)" }}
    />
    <div
      className="absolute top-3/8 h-1/16 aspect-square rounded-bowtie bg-red-500 -rotate-135 origin-top-right"
      style={{ right: "calc(25%)" }}
    />
  </div>
);

const miscPartsArray = [mustache, glasses, bowtie];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export default function HangmanDrawing({
  numberOfGuesses,
}: HangmanDrawingProps) {
  // let randIndex = Math.floor(Math.random() * miscPartsArray.length);
  // const [seventhPart] = useState(miscPartsArray[randIndex]);
  // bodyPartsArray.push(seventhPart);

  let randIndices = getRandNumbers(miscPartsArray.length, 0, 2);
  randIndices.forEach((index) => bodyPartsArray.push(miscPartsArray[index]));

  return (
    <div className="w-5/6 max-w-2xl relative flex flex-col items-center pt-2 sm:pt-4">
      {bodyPartsArray.slice(0, numberOfGuesses)}
      {/* {bodyPartsArray}
      {miscPartsArray} */}
      {/* Drawing the 'gallow' */}
      <div
        className="border-l-10 border-black w-0"
        style={{ height: "50vh" }}
      />
      <div className="absolute left-1/2 border-t-10 border-black w-1/4" />
      <div
        className="absolute border-x-5 border-black w-0 h-1/8"
        style={{ right: "calc(25% - 5px)" }}
      />
      <div className="absolute bottom-0 border-t-10 border-black w-1/2" />
    </div>
  );
}
