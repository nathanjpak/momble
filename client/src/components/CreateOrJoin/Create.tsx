import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postRoom } from "../../util/functions";

enum Game {
  hangman = "hangman",
}

interface MultiplayerInput {
  game: Game;
  maxOccupancy: number;
}

export default function CreateMultiplayer() {
  const { register, handleSubmit } = useForm<MultiplayerInput>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<MultiplayerInput> = async (data) => {
    await postRoom(data).then((response) => {
      const roomId = response.data._id;
      const urlString = `../../m/${roomId}`;
      navigate(urlString);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("game")}>
        <option value="hangman">Hangman</option>
      </select>
      <label htmlFor="maxOccupancy">Room Capacity {"(2 to 4)"}</label>
      <input
        type="number"
        defaultValue={2}
        min={2}
        max={4}
        {...register("maxOccupancy")}
      />

      <button type="submit">Create Room</button>
    </form>
  );
}
