import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import socket from "../../socket";
import { HangmanPlayer } from "./types";

export default function EnterName({ game }: { game: string }) {
  const { register, handleSubmit } = useForm();

  const { roomId } = useParams();

  const onSubmit = async (data: any) => {
    const player = new HangmanPlayer(data.name, 0, true);

    console.log(player);

    socket.emit(`${game}:update-player`, roomId, player);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Enter your name:</p>
      <input
        {...register("name", {
          required: "Name cannot be empty.",
          maxLength: {
            value: 25,
            message: "Name cannot contain more than 25 characters.",
          },
        })}
        type="text"
      />
      <button type="submit">Join Game</button>
    </form>
  );
}
