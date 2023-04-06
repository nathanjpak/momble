import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchRoom } from "../../util/functions";

interface JoinCodeInput {
  code: String;
}

export default function JoinMultiplayer() {
  const { register, handleSubmit } = useForm<JoinCodeInput>();

  const navigate = useNavigate();

  const onCodeSubmit: SubmitHandler<JoinCodeInput> = async (data) => {
    const code = data.code.toString();
    await fetchRoom(code).then((response) => {
      const roomId = response.data._id;
      if (roomId) {
        const urlString = `../../m/${roomId}`;
        navigate(urlString);
      } else {
        alert("Error finding room. Room may not exist.");
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCodeSubmit)}>
        <label>Code:</label>
        <input type="text" {...register("code")}></input>
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}
