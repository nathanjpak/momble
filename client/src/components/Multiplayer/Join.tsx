import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface JoinCodeInput {
  code: String;
}

export default function JoinMultiplayer() {
  const { register, handleSubmit } = useForm<JoinCodeInput>();

  const navigate = useNavigate();

  const onCodeSubmit: SubmitHandler<JoinCodeInput> = (data) => {
    navigate("../test");
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
