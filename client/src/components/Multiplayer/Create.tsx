import { SubmitHandler, useForm } from "react-hook-form";

enum Game {
  hangman = "hangman",
}

interface MultiplayerInput {
  game: Game;
}

export default function CreateMultiplayer() {
  const { register, handleSubmit } = useForm<MultiplayerInput>();

  const onSubmit: SubmitHandler<MultiplayerInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("game")}>
        <option value="hangman">Hangman</option>
      </select>
      <button type="submit">Create Room</button>
    </form>
  );
}
