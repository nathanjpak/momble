import { SubmitHandler, useForm } from "react-hook-form";

interface JoinCodeInput {
  code: String;
}

export default function JoinMultiplayer() {
  const { register, handleSubmit } = useForm<JoinCodeInput>();

  const onCodeSubmit: SubmitHandler<JoinCodeInput> = (data) => {
    console.log(data);
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
