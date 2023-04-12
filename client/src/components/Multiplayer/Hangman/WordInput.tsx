import { SubmitHandler, useForm } from "react-hook-form";

type HangmanWordInputProps = {
  handleGuess: (guess: string) => void;
  currentTurn: boolean;
};

interface IWordInput {
  guess: string;
}

export default function HangmanWordInput({
  handleGuess,
  currentTurn,
}: HangmanWordInputProps) {
  const { register, handleSubmit } = useForm<IWordInput>();

  const onSubmit: SubmitHandler<IWordInput> = (data) => {
    handleGuess(data.guess);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Think you know the word?</p>
      <input
        disabled={!currentTurn}
        type="text"
        {...register("guess", {
          required: "Guess cannot be blank.",
          maxLength: {
            value: 20,
            message: "Your guess is too long.",
          },
        })}
      />
      <button disabled={!currentTurn} type="submit">
        Try your luck!
      </button>
    </form>
  );
}
