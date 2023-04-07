import { SubmitHandler, useForm } from "react-hook-form";

type HangmanWordInputProps = {
  handleGuess: (guess: string) => void;
};

interface IWordInput {
  guess: string;
}

export default function HangmanWordInput({
  handleGuess,
}: HangmanWordInputProps) {
  const { register, handleSubmit } = useForm<IWordInput>();

  const onSubmit: SubmitHandler<IWordInput> = (data) => {
    handleGuess(data.guess);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Think you know the word?</p>
      <input type="text" {...register("guess")} />
      <button type="submit">Try your luck!</button>
    </form>
  );
}
